"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandRelations = exports.brands = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const product_schema_1 = require("./product.schema");
exports.brands = (0, pg_core_1.pgTable)("brands", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 120 }).notNull(),
    slug: (0, pg_core_1.varchar)("slug", { length: 140 }).notNull(),
    description: (0, pg_core_1.text)("description"),
    logoUrl: (0, pg_core_1.text)("logo_url"),
    isVisible: (0, pg_core_1.boolean)("is_visible").notNull().default(true),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
}, (t) => [
    (0, pg_core_1.uniqueIndex)("brands_slug_ux").on(t.slug),
    (0, pg_core_1.index)("brands_name_idx").on(t.name),
]);
exports.brandRelations = (0, drizzle_orm_1.relations)(exports.brands, ({ many }) => ({
    products: many(product_schema_1.products),
}));
