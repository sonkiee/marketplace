"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRelations = exports.payments = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const enum_1 = require("./enum");
const user_schema_1 = require("./user.schema");
const order_schema_1 = require("./order.schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.payments = (0, pg_core_1.pgTable)("payments", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    userId: (0, pg_core_1.uuid)("user_id")
        .notNull()
        .references(() => user_schema_1.users.id, { onDelete: "restrict" }),
    orderId: (0, pg_core_1.uuid)("order_id")
        .notNull()
        .references(() => order_schema_1.orders.id, { onDelete: "cascade" }),
    provider: (0, pg_core_1.varchar)("provider", { length: 40 }).notNull(), // paystack, flutterwave...
    reference: (0, pg_core_1.varchar)("reference", { length: 120 }).notNull(),
    amount: (0, pg_core_1.numeric)("amount", { precision: 12, scale: 2 }).notNull(),
    status: (0, enum_1.paymentStatusEnum)("status").notNull().default("initiated"),
    rawWebhookData: (0, pg_core_1.jsonb)("raw_webhook_data").$type(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
}, (t) => [
    (0, pg_core_1.uniqueIndex)("payments_reference_ux").on(t.reference),
    (0, pg_core_1.index)("payments_order_idx").on(t.orderId),
    (0, pg_core_1.index)("payments_user_idx").on(t.userId),
    (0, pg_core_1.index)("payments_status_idx").on(t.status),
]);
exports.paymentRelations = (0, drizzle_orm_1.relations)(exports.payments, ({ one }) => ({
    user: one(user_schema_1.users, { fields: [exports.payments.userId], references: [user_schema_1.users.id] }),
    order: one(order_schema_1.orders, { fields: [exports.payments.orderId], references: [order_schema_1.orders.id] }),
}));
