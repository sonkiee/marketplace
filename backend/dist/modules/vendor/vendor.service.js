"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
class VendorService {
    constructor() {
        this.register = async (userId, data) => {
            // 1. Check if user already has a vendor profile
            const existingByUser = await db_1.db.query.vendors.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.vendors.userId, userId),
            });
            if (existingByUser) {
                throw Object.assign(new Error("User already has a vendor profile application"), { statusCode: 409 });
            }
            // 2. Check if business email is already registered
            const existingByEmail = await db_1.db.query.vendors.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.vendors.businessEmail, data.businessEmail.toLowerCase().trim()),
            });
            if (existingByEmail) {
                throw Object.assign(new Error("Business email is already registered"), { statusCode: 409 });
            }
            const [vendor] = await db_1.db
                .insert(schema_1.vendors)
                .values({
                userId,
                businessName: data.businessName.trim(),
                businessEmail: data.businessEmail.toLowerCase().trim(),
                phone: data.phone.trim(),
                description: data.description ?? null,
                logo: data.logo ?? null,
                banner: data.banner ?? null,
                address: data.address ?? null,
                status: "PENDING",
            })
                .returning();
            return vendor;
        };
        this.getProfile = async (userId) => {
            const vendor = await db_1.db.query.vendors.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.vendors.userId, userId),
            });
            if (!vendor) {
                throw Object.assign(new Error("Vendor profile not found"), { statusCode: 404 });
            }
            return vendor;
        };
        this.getProfileById = async (vendorId) => {
            const vendor = await db_1.db.query.vendors.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.vendors.id, vendorId),
            });
            if (!vendor) {
                throw Object.assign(new Error("Vendor profile not found"), { statusCode: 404 });
            }
            return vendor;
        };
        this.updateProfile = async (userId, data) => {
            const vendor = await this.getProfile(userId);
            if (data.businessEmail) {
                const email = data.businessEmail.toLowerCase().trim();
                if (email !== vendor.businessEmail) {
                    const existing = await db_1.db.query.vendors.findFirst({
                        where: (0, drizzle_orm_1.eq)(schema_1.vendors.businessEmail, email),
                    });
                    if (existing) {
                        throw Object.assign(new Error("Business email is already registered"), { statusCode: 409 });
                    }
                }
            }
            const [updated] = await db_1.db
                .update(schema_1.vendors)
                .set({
                businessName: data.businessName?.trim() ?? vendor.businessName,
                businessEmail: data.businessEmail?.toLowerCase().trim() ?? vendor.businessEmail,
                phone: data.phone?.trim() ?? vendor.phone,
                description: data.description !== undefined ? data.description : vendor.description,
                logo: data.logo !== undefined ? data.logo : vendor.logo,
                banner: data.banner !== undefined ? data.banner : vendor.banner,
                address: data.address !== undefined ? data.address : vendor.address,
                updatedAt: new Date(),
            })
                .where((0, drizzle_orm_1.eq)(schema_1.vendors.id, vendor.id))
                .returning();
            return updated;
        };
        this.getDashboardStats = async (vendorId) => {
            // 1. Calculate total revenue and items sold from order_items
            const salesRes = await db_1.db
                .select({
                revenue: (0, drizzle_orm_1.sql) `coalesce(sum(${schema_1.orderItems.unitPrice}::numeric * ${schema_1.orderItems.qty}), 0)`,
                itemsSold: (0, drizzle_orm_1.sql) `coalesce(sum(${schema_1.orderItems.qty}), 0)`,
                orderCount: (0, drizzle_orm_1.sql) `count(distinct ${schema_1.orderItems.orderId})`,
            })
                .from(schema_1.orderItems)
                .where((0, drizzle_orm_1.eq)(schema_1.orderItems.vendorId, vendorId));
            const revenue = Number(salesRes[0]?.revenue ?? 0);
            const itemsSold = Number(salesRes[0]?.itemsSold ?? 0);
            const orderCount = Number(salesRes[0]?.orderCount ?? 0);
            // 2. Out of stock products count
            const outOfStockRes = await db_1.db
                .select({
                count: (0, drizzle_orm_1.sql) `count(distinct ${schema_1.productVariants.id})`,
            })
                .from(schema_1.productVariants)
                .innerJoin(schema_1.products, (0, drizzle_orm_1.eq)(schema_1.products.id, schema_1.productVariants.productId))
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.products.vendorId, vendorId), (0, drizzle_orm_1.eq)(schema_1.productVariants.stockQty, 0)));
            const outOfStockCount = Number(outOfStockRes[0]?.count ?? 0);
            // 3. Recent orders (order items belonging to this vendor)
            const recentItems = await db_1.db.query.orderItems.findMany({
                where: (0, drizzle_orm_1.eq)(schema_1.orderItems.vendorId, vendorId),
                orderBy: (oi, { desc }) => [desc(oi.createdAt)],
                limit: 10,
                with: {
                    order: {
                        with: {
                            user: {
                                columns: {
                                    firstName: true,
                                    lastName: true,
                                    email: true,
                                },
                            },
                        },
                    },
                },
            });
            return {
                revenue,
                itemsSold,
                orderCount,
                outOfStockCount,
                recentOrders: recentItems.map((item) => ({
                    orderItemId: item.id,
                    orderId: item.orderId,
                    orderNumber: item.order?.orderNumber,
                    status: item.order?.status,
                    createdAt: item.order?.createdAt,
                    productTitle: item.productTitleSnapshot,
                    qty: item.qty,
                    unitPrice: item.unitPrice,
                    customerName: item.order?.user
                        ? `${item.order.user.firstName} ${item.order.user.lastName}`
                        : "Customer",
                    customerEmail: item.order?.user?.email,
                })),
            };
        };
        this.listOrders = async (vendorId) => {
            const items = await db_1.db.query.orderItems.findMany({
                where: (0, drizzle_orm_1.eq)(schema_1.orderItems.vendorId, vendorId),
                orderBy: (oi, { desc }) => [desc(oi.createdAt)],
                with: {
                    order: {
                        with: {
                            user: {
                                columns: {
                                    id: true,
                                    firstName: true,
                                    lastName: true,
                                    email: true,
                                },
                            },
                        },
                    },
                },
            });
            return items;
        };
    }
}
exports.VendorService = VendorService;
