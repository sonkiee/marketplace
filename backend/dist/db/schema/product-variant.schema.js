"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variantRelations = exports.productVariants = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const enum_1 = require("./enum");
const product_schema_1 = require("./product.schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.productVariants = (0, pg_core_1.pgTable)("product_variants", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    productId: (0, pg_core_1.uuid)("product_id")
        .notNull()
        .references(() => product_schema_1.products.id, { onDelete: "cascade" }),
    sku: (0, pg_core_1.varchar)("sku", { length: 80 }), // optional but recommended
    condition: (0, enum_1.productConditionEnum)("condition").notNull(),
    storage: (0, pg_core_1.integer)("storage"), // e.g. 64/128/256; nullable for accessories
    color: (0, pg_core_1.varchar)("color", { length: 60 }),
    price: (0, pg_core_1.numeric)("price", { precision: 12, scale: 2 }).notNull(),
    compareAtPrice: (0, pg_core_1.numeric)("compare_at_price", { precision: 12, scale: 2 }),
    stockQty: (0, pg_core_1.integer)("stock_qty").notNull().default(0),
    isActive: (0, pg_core_1.boolean)("is_active").notNull().default(true),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
}, (t) => [
    (0, pg_core_1.index)("variants_product_idx").on(t.productId),
    (0, pg_core_1.uniqueIndex)("variants_sku_ux").on(t.sku),
    (0, pg_core_1.index)("variants_condition_idx").on(t.condition),
    (0, pg_core_1.index)("variants_price_idx").on(t.price),
    (0, pg_core_1.index)("variants_active_idx").on(t.isActive),
]);
exports.variantRelations = (0, drizzle_orm_1.relations)(exports.productVariants, ({ one }) => ({
    product: one(product_schema_1.products, {
        fields: [exports.productVariants.productId],
        references: [product_schema_1.products.id],
    }),
}));
