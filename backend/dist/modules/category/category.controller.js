"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_schema_1 = require("../../db/schema/category.schema");
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../../db");
class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
        this.newCategory = async (req, res, next) => {
            try {
                const body = req.body;
                if (!body?.name) {
                    res.status(400).json({ message: "name is required" });
                    return;
                }
                const existingByName = await this.categoryService.findByName(body.name);
                if (existingByName) {
                    res.status(409).json({ message: "Category already exists" });
                    return;
                }
                const created = await this.categoryService.create(body);
                res.status(201).json({
                    success: true,
                    message: "Category created successfully",
                    data: created,
                });
            }
            catch (err) {
                next(err);
            }
        };
        this.list = async (req, res) => {
            const data = await this.categoryService.list();
            res.status(200).json(data);
        };
        this.getCategoryById = async (req, res, next) => {
            try {
                const { id } = req.params;
                const category = await this.categoryService.findById(id);
                if (!category) {
                    res.status(404).json({ message: "Category not found" });
                    return;
                }
                // OPTIONAL: if you want products included (like mongoose populate)
                const withProducts = await db_1.db.query.categories.findFirst({
                    where: (0, drizzle_orm_1.eq)(category_schema_1.categories.id, id),
                    with: { products: true },
                });
                res.status(200).json({ category: withProducts ?? category });
            }
            catch (err) {
                next(err);
            }
        };
        this.getCategoryBySlug = async (req, res, next) => {
            try {
                const { slug } = req.params;
                const category = await this.categoryService.findBySlug(slug);
                if (!category) {
                    res.status(404).json({ message: "Category not found" });
                    return;
                }
                const withProducts = await db_1.db.query.categories.findFirst({
                    where: (0, drizzle_orm_1.eq)(category_schema_1.categories.slug, slug),
                    with: { products: true },
                });
                res.status(200).json({ category: withProducts ?? category });
            }
            catch (err) {
                next(err);
            }
        };
        this.updateCategory = async (req, res, next) => {
            try {
                const { id } = req.params;
                const body = req.body;
                if (!body?.name) {
                    res.status(400).json({ message: "name is required" });
                    return;
                }
                const existing = await this.categoryService.findById(id);
                if (!existing) {
                    res.status(404).json({ message: "Category not found" });
                    return;
                }
                // prevent duplicate name on another row
                const dup = await this.categoryService.findByName(body.name);
                if (dup && dup.id !== id) {
                    res.status(409).json({ message: "Category name already exists" });
                    return;
                }
                const updated = await this.categoryService.update(id, body);
                res.status(200).json({
                    success: true,
                    message: "Category updated",
                    data: updated,
                });
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.CategoryController = CategoryController;
