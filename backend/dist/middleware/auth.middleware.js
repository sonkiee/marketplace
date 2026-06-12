"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canManageProduct = exports.isApprovedVendor = exports.admin = exports.protect = void 0;
const jwt_1 = require("../utils/jwt");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
function getToken(req) {
    return req.cookies?.access_token;
}
const protect = async (req, res, next) => {
    const token = getToken(req);
    if (!token) {
        res.status(401).json({ message: "Verily, You must be logged in" });
        return;
    }
    try {
        const decoded = (0, jwt_1.verify)(token);
        const user = await db_1.db.query.users.findFirst({
            where: (users, { eq }) => eq(users.id, decoded.id),
        });
        if (!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }
        req.userId = user.id;
        req.user = user;
        return next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.protect = protect;
const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin")
        return next();
    return res.status(403).json({ message: "Admin access required" });
};
exports.admin = admin;
const isApprovedVendor = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    // Admins bypass vendor status check
    if (req.user.role === "admin") {
        return next();
    }
    const vendor = await db_1.db.query.vendors.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.vendors.userId, req.user.id),
    });
    if (!vendor || vendor.status !== "APPROVED") {
        return res.status(403).json({ message: "Approved vendor profile required" });
    }
    req.vendor = vendor;
    return next();
};
exports.isApprovedVendor = isApprovedVendor;
const canManageProduct = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    // Admins bypass ownership check
    if (req.user.role === "admin") {
        return next();
    }
    const productId = req.params.id;
    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
    }
    const product = await db_1.db.query.products.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.products.id, productId),
    });
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    const vendor = await db_1.db.query.vendors.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.vendors.userId, req.user.id),
    });
    if (!vendor || vendor.status !== "APPROVED") {
        return res.status(403).json({ message: "Approved vendor profile required" });
    }
    if (product.vendorId !== vendor.id) {
        return res.status(403).json({ message: "You are not authorized to manage this product" });
    }
    req.vendor = vendor;
    return next();
};
exports.canManageProduct = canManageProduct;
