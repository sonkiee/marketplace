"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
// products.service.ts
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const slugify_1 = __importDefault(require("../../utils/slugify"));
const skuify_1 = require("../../utils/skuify");
const isUUID = (v) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
const parseList = (v) => {
    if (!v)
        return [];
    if (Array.isArray(v))
        return v
            .map(String)
            .map((x) => x.trim())
            .filter(Boolean);
    return String(v)
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);
};
class ProductsService {
    constructor() {
        this.create = async (input, imageUrls) => {
            if (!input.title?.trim())
                throw Object.assign(new Error("Missing title"), { statusCode: 400 });
            if (!isUUID(input.categoryId))
                throw Object.assign(new Error("Invalid categoryId"), { statusCode: 400 });
            if (input.brandId && !isUUID(input.brandId))
                throw Object.assign(new Error("Invalid brandId"), { statusCode: 400 });
            if (!imageUrls.length)
                throw Object.assign(new Error("Upload at least one image"), {
                    statusCode: 400,
                });
            return await db_1.db.transaction(async (tx) => {
                const cat = await tx.query.categories.findFirst({
                    where: (0, drizzle_orm_1.eq)(schema_1.categories.id, input.categoryId),
                });
                if (!cat)
                    throw Object.assign(new Error("Category does not exist in store"), {
                        statusCode: 400,
                    });
                const baseSlug = (0, slugify_1.default)(input.title);
                let slug = baseSlug;
                let counter = 2;
                while (true) {
                    const existing = await tx.query.products.findFirst({
                        where: (0, drizzle_orm_1.eq)(schema_1.products.slug, slug),
                    });
                    if (!existing)
                        break;
                    slug = `${baseSlug}-${counter++}`;
                }
                const prices = input.variants.map((v) => Number(v.price ?? 0));
                const [p] = await tx
                    .insert(schema_1.products)
                    .values({
                    title: input.title.trim(),
                    slug,
                    description: input.description ?? null,
                    categoryId: input.categoryId,
                    brandId: input.brandId ?? null,
                    vendorId: input.vendorId ?? null,
                    isActive: true,
                    isFeatured: !!input.isFeatured,
                    isBestSeller: !!input.isBestSeller,
                    isNewArrival: !!input.isNewArrival,
                    minPrice: String(Math.min(...prices)),
                    maxPrice: String(Math.max(...prices)),
                    inStock: input.variants.some((v) => (v.stockQty ?? 0) > 0),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
                    .returning();
                await tx.insert(schema_1.productImages).values(imageUrls.map((url, idx) => ({
                    productId: p.id,
                    url,
                    sortOrder: idx,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })));
                const brand = input.brandId
                    ? await tx.query.brands.findFirst({
                        where: (0, drizzle_orm_1.eq)(schema_1.brands.id, input.brandId),
                    })
                    : null;
                await tx.insert(schema_1.productVariants).values(input.variants.map((v) => ({
                    productId: p.id,
                    sku: (0, skuify_1.skuify)({
                        brand: input.brandId ? brand?.name : null,
                        title: input.title,
                        storage: v.storage,
                        color: v.color ?? null,
                    }),
                    condition: v.condition,
                    storage: v.storage ?? null,
                    color: v.color ?? null,
                    price: v.price,
                    compareAtPrice: v.compareAtPrice ?? null,
                    stockQty: v.stockQty,
                    isActive: v.isActive ?? true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })));
                return p;
            });
        };
        this.list = async (params) => {
            const { search, categoryId, brandId, minPrice, maxPrice, inStock, featured, bestSeller, newArrival, sort, page = 1, limit = 20, category, storage, vendorId, } = params || {};
            const conditions = [];
            conditions.push((0, drizzle_orm_1.eq)(schema_1.products.isActive, true));
            if (search) {
                conditions.push((0, drizzle_orm_1.or)((0, drizzle_orm_1.ilike)(schema_1.products.title, `%${search}%`), (0, drizzle_orm_1.ilike)(schema_1.products.description, `%${search}%`)));
            }
            if (categoryId) {
                conditions.push((0, drizzle_orm_1.eq)(schema_1.products.categoryId, categoryId));
            }
            if (brandId) {
                conditions.push((0, drizzle_orm_1.eq)(schema_1.products.brandId, brandId));
            }
            if (vendorId) {
                conditions.push((0, drizzle_orm_1.eq)(schema_1.products.vendorId, vendorId));
            }
            if (minPrice !== undefined) {
                conditions.push((0, drizzle_orm_1.gte)(schema_1.products.maxPrice, String(minPrice)));
            }
            if (maxPrice !== undefined) {
                conditions.push((0, drizzle_orm_1.lte)(schema_1.products.minPrice, String(maxPrice)));
            }
            if (inStock !== undefined) {
                conditions.push((0, drizzle_orm_1.eq)(schema_1.products.inStock, !!inStock));
            }
            if (featured !== undefined) {
                conditions.push((0, drizzle_orm_1.eq)(schema_1.products.isFeatured, !!featured));
            }
            if (bestSeller !== undefined) {
                conditions.push((0, drizzle_orm_1.eq)(schema_1.products.isBestSeller, !!bestSeller));
            }
            if (newArrival !== undefined) {
                conditions.push((0, drizzle_orm_1.eq)(schema_1.products.isNewArrival, !!newArrival));
            }
            let orderBy;
            switch (sort) {
                case "price_asc":
                    orderBy = (0, drizzle_orm_1.asc)(schema_1.products.minPrice);
                    break;
                case "price_desc":
                    orderBy = (0, drizzle_orm_1.desc)(schema_1.products.maxPrice);
                    break;
                case "newest":
                default:
                    orderBy = (0, drizzle_orm_1.desc)(schema_1.products.createdAt);
            }
            const offset = (page - 1) * limit;
            // const query = db
            //   .select({
            //     product: products,
            //     category: categories,
            //     variant: productVariants,
            //   })
            //   .from(products)
            //   .innerJoin(categories, eq(categories.id, products.categoryId))
            //   .innerJoin(productVariants, eq(productVariants.productId, products.id))
            //   .where(and(...conditions))
            //   .orderBy(desc(products.createdAt))
            //   .limit(limit)
            //   .offset(offset);
            // return query;
            if (category) {
                conditions.push((0, drizzle_orm_1.inArray)(schema_1.products.categoryId, (0, drizzle_orm_1.sql) `(SELECT id FROM categories WHERE name = ${category})`));
                // const rows = await query;
                // return rows.filter((row) => row.category?.name === category);
            }
            if (storage) {
                conditions.push((0, drizzle_orm_1.inArray)(schema_1.products.id, db_1.db
                    .select({ productId: schema_1.productVariants.productId }) // correct column
                    .from(schema_1.productVariants)
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.productVariants.storage, storage), (0, drizzle_orm_1.eq)(schema_1.productVariants.isActive, true)))));
            }
            const query = db_1.db.query.products.findMany({
                where: (0, drizzle_orm_1.and)(...conditions),
                orderBy,
                limit,
                offset,
                with: {
                    brand: {
                        columns: { id: true, name: true },
                    },
                    images: true,
                    variants: storage
                        ? {
                            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.productVariants.storage, storage), (0, drizzle_orm_1.eq)(schema_1.productVariants.isActive, true)),
                        }
                        : true,
                    category: {
                        columns: { id: true, name: true },
                    },
                },
            });
            return query;
        };
        this.getBySlug = async (slug) => {
            const product = await db_1.db.query.products.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.products.slug, slug),
                with: {
                    images: true,
                    variants: true,
                    category: {
                        columns: { id: true, name: true },
                    },
                    brand: {
                        columns: { id: true, name: true },
                    },
                },
            });
            if (!product)
                throw Object.assign(new Error("Product not found"), { statusCode: 404 });
            return product;
        };
        this.getById = async (id) => {
            if (!isUUID(id))
                throw Object.assign(new Error("Invalid product id"), { statusCode: 400 });
            const product = await db_1.db.query.products.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.products.id, id),
                with: {
                    images: true,
                    variants: true,
                    category: {
                        columns: { id: true, name: true },
                    },
                    brand: {
                        columns: { id: true, name: true },
                    },
                },
            });
            if (!product)
                throw Object.assign(new Error("Product not found"), { statusCode: 404 });
            return product;
        };
        this.update = async (id, input) => {
            if (!isUUID(id))
                throw Object.assign(new Error("Invalid product id"), { statusCode: 400 });
            return await db_1.db.transaction(async (tx) => {
                const existing = await tx.query.products.findFirst({
                    where: (0, drizzle_orm_1.eq)(schema_1.products.id, id),
                });
                if (!existing)
                    throw Object.assign(new Error("Product not found"), {
                        statusCode: 404,
                    });
                const patch = { updatedAt: new Date() };
                if (input.title) {
                    patch.title = input.title.trim();
                    const baseSlug = (0, slugify_1.default)(patch.title);
                    let slug = baseSlug;
                    for (let i = 0; i < 10; i++) {
                        const hit = await tx.query.products.findFirst({
                            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.products.slug, slug), (0, drizzle_orm_1.sql) `${schema_1.products.id} <> ${id}`),
                        });
                        if (!hit)
                            break;
                        slug = `${baseSlug}-${Math.floor(Math.random() * 10000)}`;
                    }
                    patch.slug = slug;
                }
                if (input.description !== undefined)
                    patch.description = input.description ?? null;
                if (input.categoryId) {
                    if (!isUUID(input.categoryId))
                        throw Object.assign(new Error("Invalid categoryId"), {
                            statusCode: 400,
                        });
                    patch.categoryId = input.categoryId;
                }
                if (input.brandId !== undefined) {
                    if (input.brandId && !isUUID(input.brandId))
                        throw Object.assign(new Error("Invalid brandId"), {
                            statusCode: 400,
                        });
                    patch.brandId = input.brandId ? input.brandId : null;
                }
                if (input.isFeatured !== undefined)
                    patch.isFeatured = !!input.isFeatured;
                if (input.isBestSeller !== undefined)
                    patch.isBestSeller = !!input.isBestSeller;
                if (input.isNewArrival !== undefined)
                    patch.isNewArrival = !!input.isNewArrival;
                const [p] = await tx
                    .update(schema_1.products)
                    .set(patch)
                    .where((0, drizzle_orm_1.eq)(schema_1.products.id, id))
                    .returning();
                // Optional: if they pass price/stock, update all variants + recompute aggregates
                if (input.price !== undefined || input.stock !== undefined) {
                    const vpatch = { updatedAt: new Date() };
                    if (input.price !== undefined) {
                        const price = Number(input.price);
                        if (!Number.isFinite(price) || price <= 0)
                            throw Object.assign(new Error("Invalid price"), {
                                statusCode: 400,
                            });
                        vpatch.price = String(price);
                    }
                    if (input.stock !== undefined) {
                        const stock = Number(input.stock);
                        if (!Number.isFinite(stock) || stock < 0)
                            throw Object.assign(new Error("Invalid stock"), {
                                statusCode: 400,
                            });
                        vpatch.stock = stock;
                    }
                    await tx
                        .update(schema_1.productVariants)
                        .set(vpatch)
                        .where((0, drizzle_orm_1.eq)(schema_1.productVariants.productId, id));
                    const agg = await tx.execute((0, drizzle_orm_1.sql) `
          SELECT
            MIN(price)::numeric AS min_price,
            MAX(price)::numeric AS max_price,
            SUM(CASE WHEN stock > 0 THEN 1 ELSE 0 END)::int AS in_stock_count
          FROM product_variants
          WHERE product_id = ${id}
        `);
                    const row = agg.rows?.[0];
                    if (row) {
                        await tx
                            .update(schema_1.products)
                            .set({
                            minPrice: row.min_price,
                            maxPrice: row.max_price,
                            inStock: (row.in_stock_count ?? 0) > 0,
                            updatedAt: new Date(),
                        })
                            .where((0, drizzle_orm_1.eq)(schema_1.products.id, id));
                    }
                }
                return p;
            });
        };
        this.delete_image = async (id, imageId) => {
            if (!isUUID(id))
                throw Object.assign(new Error("Invalid product id"), { statusCode: 400 });
            if (!isUUID(imageId))
                throw Object.assign(new Error("Invalid image id"), { statusCode: 400 });
            return await db_1.db.transaction(async (tx) => {
                // 1. check how many images exist
                const images = await tx
                    .select()
                    .from(schema_1.productImages)
                    .where((0, drizzle_orm_1.eq)(schema_1.productImages.productId, id));
                if (images.length <= 1) {
                    throw Object.assign(new Error("Product must have at least one image"), {
                        statusCode: 400,
                    });
                }
                // 2. delete target image
                const deleted = await tx
                    .delete(schema_1.productImages)
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.productImages.productId, id), (0, drizzle_orm_1.eq)(schema_1.productImages.id, imageId)))
                    .returning();
                if (deleted.length === 0) {
                    throw Object.assign(new Error("Image not found"), {
                        statusCode: 404,
                    });
                }
                return true;
            });
        };
        this.delete = async (id) => {
            if (!isUUID(id))
                throw Object.assign(new Error("Invalid product id"), { statusCode: 400 });
            return await db_1.db.transaction(async (tx) => {
                await tx.delete(schema_1.productImages).where((0, drizzle_orm_1.eq)(schema_1.productImages.productId, id));
                await tx.delete(schema_1.productVariants).where((0, drizzle_orm_1.eq)(schema_1.productVariants.productId, id));
                const deleted = await tx
                    .delete(schema_1.products)
                    .where((0, drizzle_orm_1.eq)(schema_1.products.id, id))
                    .returning();
                if (deleted.length === 0)
                    throw Object.assign(new Error("Product not found"), {
                        statusCode: 404,
                    });
                return true;
            });
        };
    }
}
exports.ProductsService = ProductsService;
