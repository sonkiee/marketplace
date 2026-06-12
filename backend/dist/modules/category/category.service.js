"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
// category.service.ts
const db_1 = require("../../db");
const category_schema_1 = require("../../db/schema/category.schema");
const drizzle_orm_1 = require("drizzle-orm");
const slugify = (s) => s.trim().toLowerCase().replace(/\s+/g, "-");
class CategoryService {
    constructor() {
        this.findById = async (id) => {
            return db_1.db.query.categories.findFirst({
                where: (0, drizzle_orm_1.eq)(category_schema_1.categories.id, id),
            });
        };
        this.findBySlug = async (slug) => {
            return db_1.db.query.categories.findFirst({
                where: (0, drizzle_orm_1.eq)(category_schema_1.categories.slug, slug),
            });
        };
        this.findByName = async (name) => {
            return db_1.db.query.categories.findFirst({
                where: (0, drizzle_orm_1.eq)(category_schema_1.categories.name, name),
            });
        };
        this.list = async () => {
            return db_1.db.query.categories.findMany({
                orderBy: (c, { desc }) => [desc(c.createdAt)],
            });
        };
        this.create = async (input) => {
            const slug = slugify(String(input.name)); // enum name -> string
            const [created] = await db_1.db
                .insert(category_schema_1.categories)
                .values({
                ...input,
                slug,
            })
                .returning();
            if (!created)
                throw new Error("Failed to create category");
            return created;
        };
        this.update = async (id, input) => {
            const slug = slugify(String(input.name));
            const [updated] = await db_1.db
                .update(category_schema_1.categories)
                .set({
                ...input,
                slug,
                updatedAt: new Date(),
            })
                .where((0, drizzle_orm_1.eq)(category_schema_1.categories.id, id))
                .returning();
            if (!updated)
                throw new Error("Category not found");
            return updated;
        };
    }
}
exports.CategoryService = CategoryService;
