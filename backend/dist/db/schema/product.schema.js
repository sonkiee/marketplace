"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRelations = exports.products = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const category_schema_1 = require("./category.schema");
const brand_schema_1 = require("./brand.schema");
const drizzle_orm_1 = require("drizzle-orm");
const product_image_schema_1 = require("./product-image.schema");
const product_variant_schema_1 = require("./product-variant.schema");
const vendor_schema_1 = require("./vendor.schema");
exports.products = (0, pg_core_1.pgTable)("products", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    categoryId: (0, pg_core_1.uuid)("category_id")
        .notNull()
        .references(() => category_schema_1.categories.id, { onDelete: "restrict" }),
    brandId: (0, pg_core_1.uuid)("brand_id").references(() => brand_schema_1.brands.id, {
        onDelete: "set null",
    }),
    title: (0, pg_core_1.varchar)("title", { length: 200 }).notNull(),
    slug: (0, pg_core_1.varchar)("slug", { length: 220 }).notNull(),
    // optional phone-catalogue fields
    model: (0, pg_core_1.varchar)("model", { length: 160 }), // "iPhone 13 Pro Max"
    series: (0, pg_core_1.varchar)("series", { length: 160 }), // "13 Series"
    specs: (0, pg_core_1.jsonb)("specs").$type(), // screen, chip, etc.
    description: (0, pg_core_1.text)("description"),
    isActive: (0, pg_core_1.boolean)("is_active").notNull().default(true),
    // listing helpers (recommended for fast filtering)
    minPrice: (0, pg_core_1.numeric)("min_price", { precision: 12, scale: 2 }),
    maxPrice: (0, pg_core_1.numeric)("max_price", { precision: 12, scale: 2 }),
    inStock: (0, pg_core_1.boolean)("in_stock").notNull().default(true),
    isFeatured: (0, pg_core_1.boolean)("is_featured").notNull().default(false),
    isBestSeller: (0, pg_core_1.boolean)("is_best_seller").notNull().default(false),
    isNewArrival: (0, pg_core_1.boolean)("is_new_arrival").notNull().default(false),
    vendorId: (0, pg_core_1.uuid)("vendor_id").references(() => vendor_schema_1.vendors.id, { onDelete: "cascade" }),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
}, (t) => [
    (0, pg_core_1.uniqueIndex)("products_slug_ux").on(t.slug),
    (0, pg_core_1.index)("products_category_idx").on(t.categoryId),
    (0, pg_core_1.index)("products_brand_idx").on(t.brandId),
    (0, pg_core_1.index)("products_active_idx").on(t.isActive),
    (0, pg_core_1.index)("products_min_price_idx").on(t.minPrice),
    (0, pg_core_1.index)("products_vendor_idx").on(t.vendorId),
]);
exports.productRelations = (0, drizzle_orm_1.relations)(exports.products, ({ one, many }) => ({
    category: one(category_schema_1.categories, {
        fields: [exports.products.categoryId],
        references: [category_schema_1.categories.id],
    }),
    brand: one(brand_schema_1.brands, {
        fields: [exports.products.brandId],
        references: [brand_schema_1.brands.id],
    }),
    images: many(product_image_schema_1.productImages),
    variants: many(product_variant_schema_1.productVariants),
    vendor: one(vendor_schema_1.vendors, {
        fields: [exports.products.vendorId],
        references: [vendor_schema_1.vendors.id],
    }),
}));
