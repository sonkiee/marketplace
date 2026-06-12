"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const cloudinary_1 = require("../../utils/cloudinary");
const is_uuid_1 = require("../../utils/is-uuid");
class ProductsController {
    constructor(service) {
        this.service = service;
        this.create = async (req, res) => {
            const files = req.files;
            if (!files || !files.length)
                return res.status(400).json({ message: "Upload at least one image" });
            const imageUrls = await Promise.all(files.map((file, idx) => (0, cloudinary_1.uploadImage)(file.buffer, `product-${Date.now()}-${idx}`)));
            const body = JSON.parse(req.body.data ?? "{}");
            const input = body;
            if (req.vendor) {
                input.vendorId = req.vendor.id;
            }
            console.log("Input from client:", input);
            console.log("Image URLs:", imageUrls);
            const product = await this.service.create(input, imageUrls);
            return res.status(201).json({ success: true, message: "Product created successfully", data: product });
        };
        this.list = async (req, res) => {
            const filters = req.query;
            if (filters.storage)
                filters.storage = Number(filters.storage);
            console.log("Filter:", filters);
            const rows = await this.service.list(filters);
            if (!rows.length)
                return res.status(404).json({ message: "No products found" });
            return res.status(200).json({
                success: true,
                message: "Products retrieved successfully",
                data: rows,
            });
        };
        this.getOne = async (req, res) => {
            const identifier = Array.isArray(req.params.identifier)
                ? req.params.identifier[0]
                : req.params.identifier;
            const isUuidValue = (0, is_uuid_1.isUUID)(identifier);
            try {
                const product = isUuidValue
                    ? await this.service.getById(identifier)
                    : await this.service.getBySlug(identifier);
                return res.status(200).json({
                    success: true,
                    message: "Product retrieved successfully",
                    data: product,
                });
            }
            catch (e) {
                const code = e?.statusCode ?? 500;
                return res.status(code).json({ message: e?.message ?? "Server error" });
            }
        };
        this.getBySlug = async (req, res) => {
            try {
                const product = await this.service.getBySlug(String(req.params.slug));
                return res.status(200).json({
                    success: true,
                    message: "Product retrieved successfully",
                    data: product,
                });
            }
            catch (e) {
                const code = e?.statusCode ?? 500;
                return res.status(code).json({ message: e?.message ?? "Server error" });
            }
        };
        this.getById = async (req, res) => {
            try {
                const product = await this.service.getById(String(req.params.id));
                return res.status(200).json({
                    success: true,
                    message: "Product retrieved successfully",
                    data: product,
                });
            }
            catch (e) {
                const code = e?.statusCode ?? 500;
                return res.status(code).json({ message: e?.message ?? "Server error" });
            }
        };
        this.delete_image = async (req, res) => {
            try {
                const id = String(req.params.id);
                const imageId = String(req.params.imageId);
                await this.service.delete_image(id, imageId);
                return res.status(200).json({
                    success: true,
                    message: "Image deleted successfully",
                });
            }
            catch (e) {
                const code = e?.statusCode ?? 500;
                return res.status(code).json({ message: e?.message ?? "Server error" });
            }
        };
        this.update = async (req, res) => {
            try {
                const id = String(req.params.id);
                const body = req.body;
                const updated = await this.service.update(id, {
                    title: body.title,
                    description: body.description,
                    categoryId: body.categoryId,
                    brandId: body.brandId,
                    price: body.price !== undefined ? Number(body.price) : undefined,
                    stock: body.stock !== undefined ? Number(body.stock) : undefined,
                    isFeatured: body.isFeatured !== undefined
                        ? body.isFeatured === "true" || body.isFeatured === true
                        : undefined,
                    isBestSeller: body.isBestSeller !== undefined
                        ? body.isBestSeller === "true" || body.isBestSeller === true
                        : undefined,
                    isNewArrival: body.isNewArrival !== undefined
                        ? body.isNewArrival === "true" || body.isNewArrival === true
                        : undefined,
                });
                return res.status(200).json({
                    success: true,
                    message: "Product updated successfully",
                    data: updated,
                });
            }
            catch (e) {
                const code = e?.statusCode ?? 500;
                return res.status(code).json({ message: e?.message ?? "Server error" });
            }
        };
        this.delete = async (req, res) => {
            try {
                await this.service.delete(String(req.params.id));
                return res
                    .status(200)
                    .json({ success: true, message: "Product deleted successfully" });
            }
            catch (e) {
                const code = e?.statusCode ?? 500;
                return res.status(code).json({ message: e?.message ?? "Server error" });
            }
        };
    }
}
exports.ProductsController = ProductsController;
