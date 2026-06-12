"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorRelations = exports.vendors = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_schema_1 = require("./user.schema");
const enum_1 = require("./enum");
const drizzle_orm_1 = require("drizzle-orm");
const product_schema_1 = require("./product.schema");
exports.vendors = (0, pg_core_1.pgTable)("vendors", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    userId: (0, pg_core_1.uuid)("user_id")
        .notNull()
        .references(() => user_schema_1.users.id, { onDelete: "cascade" }),
    businessName: (0, pg_core_1.varchar)("business_name", { length: 180 }).notNull(),
    businessEmail: (0, pg_core_1.varchar)("business_email", { length: 180 }).notNull(),
    phone: (0, pg_core_1.varchar)("phone", { length: 20 }).notNull(),
    description: (0, pg_core_1.text)("description"),
    logo: (0, pg_core_1.text)("logo"),
    banner: (0, pg_core_1.text)("banner"),
    address: (0, pg_core_1.text)("address"),
    status: (0, enum_1.vendorStatusEnum)("status").notNull().default("PENDING"),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
}, (t) => [
    (0, pg_core_1.uniqueIndex)("vendors_user_id_ux").on(t.userId),
    (0, pg_core_1.uniqueIndex)("vendors_business_email_ux").on(t.businessEmail),
    (0, pg_core_1.index)("vendors_status_idx").on(t.status),
]);
exports.vendorRelations = (0, drizzle_orm_1.relations)(exports.vendors, ({ one, many }) => ({
    user: one(user_schema_1.users, {
        fields: [exports.vendors.userId],
        references: [user_schema_1.users.id],
    }),
    products: many(product_schema_1.products),
}));
