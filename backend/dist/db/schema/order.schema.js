"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderItemRelations = exports.orderRelations = exports.orderItems = exports.orders = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const enum_1 = require("./enum");
const user_schema_1 = require("./user.schema");
const product_variant_schema_1 = require("./product-variant.schema");
const drizzle_orm_1 = require("drizzle-orm");
const address_schema_1 = require("./address.schema");
const vendor_schema_1 = require("./vendor.schema");
exports.orders = (0, pg_core_1.pgTable)("orders", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    userId: (0, pg_core_1.uuid)("user_id")
        .notNull()
        .references(() => user_schema_1.users.id, { onDelete: "restrict" }),
    orderNumber: (0, pg_core_1.varchar)("order_number", { length: 40 }).notNull(),
    status: (0, enum_1.orderStatusEnum)("status").notNull().default("pending_payment"),
    // totals
    subtotal: (0, pg_core_1.numeric)("subtotal", { precision: 12, scale: 2 })
        .notNull()
        .default("0"),
    shippingFee: (0, pg_core_1.numeric)("shipping_fee", { precision: 12, scale: 2 })
        .notNull()
        .default("0"),
    discountTotal: (0, pg_core_1.numeric)("discount_total", { precision: 12, scale: 2 })
        .notNull()
        .default("0"),
    total: (0, pg_core_1.numeric)("total", { precision: 12, scale: 2 }).notNull().default("0"),
    addressId: (0, pg_core_1.uuid)("address_id").references(() => address_schema_1.addresses.id, {
        onDelete: "set null",
    }),
    // keep the actual address used at checkout (snapshot)
    shippingAddressSnapshot: (0, pg_core_1.jsonb)("shipping_address_snapshot")
        .$type()
        .notNull(),
    deliveryMethod: (0, enum_1.deliveryMethodEnum)("delivery_method")
        .notNull()
        .default("pickup"),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
}, (t) => [
    (0, pg_core_1.uniqueIndex)("orders_order_number_ux").on(t.orderNumber),
    (0, pg_core_1.index)("orders_user_idx").on(t.userId),
    (0, pg_core_1.index)("orders_status_idx").on(t.status),
]);
exports.orderItems = (0, pg_core_1.pgTable)("order_items", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    orderId: (0, pg_core_1.uuid)("order_id")
        .notNull()
        .references(() => exports.orders.id, { onDelete: "cascade" }),
    variantId: (0, pg_core_1.uuid)("variant_id").references(() => product_variant_schema_1.productVariants.id, {
        onDelete: "set null",
    }),
    qty: (0, pg_core_1.integer)("qty").notNull().default(1),
    unitPrice: (0, pg_core_1.numeric)("unit_price", { precision: 12, scale: 2 }).notNull(),
    // snapshots (important: product title/variant data at time of purchase)
    productTitleSnapshot: (0, pg_core_1.varchar)("product_title_snapshot", {
        length: 220,
    }).notNull(),
    variantSnapshot: (0, pg_core_1.jsonb)("variant_snapshot").$type(),
    vendorId: (0, pg_core_1.uuid)("vendor_id").references(() => vendor_schema_1.vendors.id, { onDelete: "set null" }),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
}, (t) => [
    (0, pg_core_1.index)("order_items_order_idx").on(t.orderId),
    (0, pg_core_1.index)("order_items_vendor_idx").on(t.vendorId),
]);
exports.orderRelations = (0, drizzle_orm_1.relations)(exports.orders, ({ one, many }) => ({
    user: one(user_schema_1.users, { fields: [exports.orders.userId], references: [user_schema_1.users.id] }),
    items: many(exports.orderItems),
}));
exports.orderItemRelations = (0, drizzle_orm_1.relations)(exports.orderItems, ({ one }) => ({
    order: one(exports.orders, { fields: [exports.orderItems.orderId], references: [exports.orders.id] }),
    variant: one(product_variant_schema_1.productVariants, {
        fields: [exports.orderItems.variantId],
        references: [product_variant_schema_1.productVariants.id],
    }),
    vendor: one(vendor_schema_1.vendors, {
        fields: [exports.orderItems.vendorId],
        references: [vendor_schema_1.vendors.id],
    }),
}));
