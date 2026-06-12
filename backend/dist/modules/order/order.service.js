"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
// order.service.ts
const db_1 = require("../../db");
const order_schema_1 = require("../../db/schema/order.schema");
const product_variant_schema_1 = require("../../db/schema/product-variant.schema");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../../db/schema");
const toMoneyString = (n) => n.toFixed(2);
const generateOrderNumber = () => {
    // simple + unique enough; replace with your own pattern
    return `ORD-${Date.now()}-${Math.random().toString(16).slice(2, 8).toUpperCase()}`;
};
class OrderService {
    constructor() {
        this.listAll = async () => {
            return db_1.db.query.orders.findMany({
                orderBy: (o, { desc }) => [desc(o.createdAt)],
                with: { user: true },
            });
        };
        this.findById = async (id) => {
            return db_1.db.query.orders.findFirst({
                where: (0, drizzle_orm_1.eq)(order_schema_1.orders.id, id),
                with: { items: true },
            });
        };
        this.listByUser = async (userId) => {
            return db_1.db.query.orders.findMany({
                where: (0, drizzle_orm_1.eq)(order_schema_1.orders.userId, userId),
                with: { items: true },
                orderBy: (o, { desc }) => [desc(o.createdAt)],
            });
        };
        // NOTE: This creates an order and order_items in ONE transaction.
        this.createForUser = async (userId, input) => {
            if (!input.items?.length)
                throw new Error("No items provided");
            // basic qty validation
            for (const it of input.items) {
                if (!it.variantId)
                    throw new Error("Each item must have variantId");
                if (!Number.isInteger(it.qty) || it.qty <= 0)
                    throw new Error("Invalid qty");
            }
            // Fetch variants
            const variantIds = input.items.map((i) => i.variantId);
            const variants = await db_1.db.query.productVariants.findMany({
                where: (0, drizzle_orm_1.inArray)(product_variant_schema_1.productVariants.id, variantIds),
                with: { product: { columns: { title: true, vendorId: true } } },
            });
            if (variants.length !== variantIds.length) {
                const found = new Set(variants.map((v) => v.id));
                const missing = variantIds.filter((id) => !found.has(id));
                throw new Error(`Variant(s) not found: ${missing.join(", ")}`);
            }
            // Compute subtotal (numeric in PG comes back as string sometimes; depends on driver)
            let subtotalNum = 0;
            // Build order items rows
            const itemsRows = input.items.map((it) => {
                const v = variants.find((x) => x.id === it.variantId);
                // If your variant price is numeric() it may be string
                const unitPriceNum = typeof v.price === "string" ? Number(v.price) : Number(v.price);
                // Optional stock check if you have v.stock
                if (typeof v.stockQty === "number" &&
                    v.stockQty < it.qty) {
                    throw new Error(`Variant ${v.id} is out of stock`);
                }
                subtotalNum += unitPriceNum * it.qty;
                return {
                    variantId: v.id,
                    qty: it.qty,
                    unitPrice: toMoneyString(unitPriceNum),
                    vendorId: v.product?.vendorId ?? null,
                    // snapshots: you MUST set productTitleSnapshot per schema
                    // If you don't have title on variant row, join it (see note below)
                    productTitleSnapshot: v.product?.title ?? v.productTitle ?? "Product",
                    variantSnapshot: {
                        condition: v.condition,
                        storage: v.storage,
                        color: v.color,
                        sku: v.sku,
                    },
                };
            });
            const shippingFeeNum = input.shippingFee ? Number(input.shippingFee) : 0;
            const discountNum = input.discountTotal ? Number(input.discountTotal) : 0;
            const totalNum = subtotalNum + shippingFeeNum - discountNum;
            const orderNumber = generateOrderNumber();
            return await db_1.db.transaction(async (tx) => {
                let addressIdToSave = null;
                let snapshot;
                if (input.addressId) {
                    const addr = await tx.query.addresses.findFirst({
                        where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.addresses.id, input.addressId), (0, drizzle_orm_1.eq)(schema_1.addresses.userId, userId)),
                    });
                    if (!addr)
                        throw new Error("Address not found");
                    snapshot = {
                        firstName: addr.firstName,
                        lastName: addr.lastName,
                        phone: addr.phone,
                        address: addr.address,
                        city: addr.city,
                        state: addr.state,
                        zip: addr.zip ?? undefined,
                        country: addr.country ?? "Nigeria",
                        label: addr.label,
                    };
                    addressIdToSave = addr.id;
                }
                else if (input.shippingAddress) {
                    const a = input.shippingAddress;
                    snapshot = {
                        firstName: a.firstName,
                        lastName: a.lastName,
                        phone: a.phone,
                        address: a.address,
                        city: a.city,
                        state: a.state,
                        zip: a.zip,
                        country: a.country,
                        label: a.label,
                    };
                    if (input.saveToAddressBook) {
                        const [createdAddress] = await tx
                            .insert(schema_1.addresses)
                            .values({
                            userId,
                            label: snapshot.label ?? "primary",
                            firstName: snapshot.firstName,
                            lastName: snapshot.lastName,
                            phone: snapshot.phone,
                            address: snapshot.address,
                            city: snapshot.city,
                            state: snapshot.state,
                            zip: snapshot.zip,
                            country: snapshot.country,
                            isDefault: false, // or set true if user wants it default
                        })
                            .returning({ id: schema_1.addresses.id });
                        if (!createdAddress)
                            throw new Error("Failed to save address");
                        addressIdToSave = createdAddress.id;
                    }
                }
                else {
                    throw new Error("Either addressId or shippingAddress must be provided");
                }
                const [createdOrder] = await tx
                    .insert(order_schema_1.orders)
                    .values({
                    userId,
                    orderNumber,
                    status: "pending_payment",
                    subtotal: toMoneyString(subtotalNum),
                    shippingFee: toMoneyString(shippingFeeNum),
                    discountTotal: toMoneyString(discountNum),
                    total: toMoneyString(totalNum),
                    shippingAddressSnapshot: snapshot,
                    deliveryMethod: input.deliveryMethod ?? "pickup",
                    addressId: addressIdToSave,
                })
                    .returning();
                if (!createdOrder)
                    throw new Error("Failed to create order");
                await tx.insert(order_schema_1.orderItems).values(itemsRows.map((row) => ({
                    orderId: createdOrder.id,
                    variantId: row.variantId,
                    qty: row.qty,
                    unitPrice: row.unitPrice,
                    vendorId: row.vendorId,
                    productTitleSnapshot: row.productTitleSnapshot,
                    variantSnapshot: row.variantSnapshot,
                })));
                // Return order with items
                const full = await tx.query.orders.findFirst({
                    where: (0, drizzle_orm_1.eq)(order_schema_1.orders.id, createdOrder.id),
                    with: { items: true },
                });
                if (!full)
                    throw new Error("Failed to load created order");
                return full;
            });
        };
    }
}
exports.OrderService = OrderService;
