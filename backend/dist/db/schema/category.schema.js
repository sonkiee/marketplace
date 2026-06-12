"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRelations = exports.categories = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const enum_1 = require("./enum");
const product_schema_1 = require("./product.schema");
exports.categories = (0, pg_core_1.pgTable)("categories", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    name: (0, enum_1.categoryNameEnum)("name").notNull(), // smartphones, parts...
    slug: (0, pg_core_1.varchar)("slug", { length: 140 }).notNull(),
    description: (0, pg_core_1.text)("description"),
    isActive: (0, pg_core_1.boolean)("is_active").notNull().default(true),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
}, (t) => [
    (0, pg_core_1.uniqueIndex)("categories_slug_ux").on(t.slug),
    (0, pg_core_1.uniqueIndex)("categories_name_ux").on(t.name),
]);
exports.categoryRelations = (0, drizzle_orm_1.relations)(exports.categories, ({ many }) => ({
    products: many(product_schema_1.products),
}));
