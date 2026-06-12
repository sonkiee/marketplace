"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRelations = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const enum_1 = require("./enum");
const drizzle_orm_1 = require("drizzle-orm");
const address_schema_1 = require("./address.schema");
const cart_schema_1 = require("./cart.schema");
const order_schema_1 = require("./order.schema");
const payment_schema_1 = require("./payment.schema");
const vendor_schema_1 = require("./vendor.schema");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    firstName: (0, pg_core_1.varchar)("first_name", { length: 80 }).notNull(),
    lastName: (0, pg_core_1.varchar)("last_name", { length: 80 }).notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 180 }).notNull(),
    phone: (0, pg_core_1.varchar)("phone", { length: 20 }),
    password: (0, pg_core_1.text)("password").notNull(),
    role: (0, enum_1.userRoleEnum)("role").notNull().default("customer"),
    isVerified: (0, pg_core_1.boolean)("is_verified").notNull().default(false),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
}, (t) => [
    (0, pg_core_1.index)("users_first_name_idx").on(t.firstName),
    (0, pg_core_1.index)("users_last_name_idx").on(t.lastName),
    (0, pg_core_1.uniqueIndex)("users_email_ux").on(t.email),
    (0, pg_core_1.index)("users_role_idx").on(t.role),
]);
exports.userRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many, one }) => ({
    addresses: many(address_schema_1.addresses),
    carts: many(cart_schema_1.carts),
    orders: many(order_schema_1.orders),
    payments: many(payment_schema_1.payments),
    vendor: one(vendor_schema_1.vendors, {
        fields: [exports.users.id],
        references: [vendor_schema_1.vendors.userId],
    }),
}));
