"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItems = exports.carts = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const enum_1 = require("./enum");
const user_schema_1 = require("./user.schema");
const product_variant_schema_1 = require("./product-variant.schema");
exports.carts = (0, pg_core_1.pgTable)("carts", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    userId: (0, pg_core_1.uuid)("user_id").references(() => user_schema_1.users.id, {
        onDelete: "set null",
    }), // allow guest carts
    status: (0, enum_1.cartStatusEnum)("status").notNull().default("active"),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
}, (t) => [
    (0, pg_core_1.index)("carts_user_idx").on(t.userId),
    (0, pg_core_1.index)("carts_status_idx").on(t.status),
]);
exports.cartItems = (0, pg_core_1.pgTable)("cart_items", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    cartId: (0, pg_core_1.uuid)("cart_id")
        .notNull()
        .references(() => exports.carts.id, { onDelete: "cascade" }),
    variantId: (0, pg_core_1.uuid)("variant_id")
        .notNull()
        .references(() => product_variant_schema_1.productVariants.id, { onDelete: "restrict" }),
    qty: (0, pg_core_1.integer)("qty").notNull().default(1),
    // snapshot price at time of add (optional but useful)
    unitPriceSnapshot: (0, pg_core_1.numeric)("unit_price_snapshot", {
        precision: 12,
        scale: 2,
    }).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
}, (t) => [
    (0, pg_core_1.index)("cart_items_cart_idx").on(t.cartId),
    (0, pg_core_1.index)("cart_items_variant_idx").on(t.variantId),
    (0, pg_core_1.uniqueIndex)("cart_items_cart_variant_ux").on(t.cartId, t.variantId),
]);
