"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productImageRelations = exports.productImages = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const product_schema_1 = require("./product.schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.productImages = (0, pg_core_1.pgTable)("product_images", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    productId: (0, pg_core_1.uuid)("product_id")
        .notNull()
        .references(() => product_schema_1.products.id, { onDelete: "cascade" }),
    url: (0, pg_core_1.text)("url").notNull(),
    isPrimary: (0, pg_core_1.boolean)("is_primary").notNull().default(false),
    sortOrder: (0, pg_core_1.integer)("sort_order").notNull().default(0),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
}, (t) => [(0, pg_core_1.index)("product_images_product_idx").on(t.productId)]);
exports.productImageRelations = (0, drizzle_orm_1.relations)(exports.productImages, ({ one }) => ({
    product: one(product_schema_1.products, {
        fields: [exports.productImages.productId],
        references: [product_schema_1.products.id],
    }),
}));
