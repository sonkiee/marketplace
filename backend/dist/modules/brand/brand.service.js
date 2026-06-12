"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
class BrandService {
    constructor() {
        this.list = async () => {
            return db_1.db.query.brands.findMany({
                orderBy: (c, { desc }) => [desc(c.createdAt)],
            });
        };
        this.findBySlug = async (slug) => {
            return await db_1.db.query.brands.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.brands.slug, slug),
            });
        };
        this.findById = async (id) => {
            return await db_1.db.query.brands.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.brands.id, id),
            });
        };
        this.create = async (name, slug) => {
            const [brand] = await db_1.db.insert(schema_1.brands).values({ name, slug }).returning();
            if (!brand)
                throw new Error("Failed to create brand");
            return brand;
        };
    }
}
exports.BrandService = BrandService;
