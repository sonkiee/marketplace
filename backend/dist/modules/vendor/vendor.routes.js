"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vendor_controller_1 = require("./vendor.controller");
const vendor_service_1 = require("./vendor.service");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const vendor_validation_1 = require("./vendor.validation");
const product_controller_1 = require("../product/product.controller");
const product_service_1 = require("../product/product.service");
const upload_middleware_1 = require("../../middleware/upload.middleware");
const router = (0, express_1.Router)();
const controller = new vendor_controller_1.VendorController(new vendor_service_1.VendorService());
const productsController = new product_controller_1.ProductsController(new product_service_1.ProductsService());
// Public onboarding: anyone logged in can register as a vendor
router.post("/register", auth_middleware_1.protect, (0, validate_middleware_1.validate)(vendor_validation_1.registerVendorSchema), controller.register);
// Profile management for the logged-in vendor
router.get("/profile", auth_middleware_1.protect, controller.getProfile);
router.put("/profile", auth_middleware_1.protect, (0, validate_middleware_1.validate)(vendor_validation_1.updateVendorSchema), controller.updateProfile);
// Vendor dashboard and orders management
router.get("/dashboard", auth_middleware_1.protect, controller.getDashboardStats);
router.get("/orders", auth_middleware_1.protect, controller.getMyOrders);
// Vendor product management routes
router.get("/products", auth_middleware_1.protect, auth_middleware_1.isApprovedVendor, async (req, res) => {
    // Inject vendorId filter to return only their own products
    req.query.vendorId = req.vendor.id;
    return productsController.list(req, res);
});
router.post("/products", auth_middleware_1.protect, auth_middleware_1.isApprovedVendor, upload_middleware_1.upload.array("files", 5), productsController.create);
router.put("/products/:id", auth_middleware_1.protect, auth_middleware_1.canManageProduct, productsController.update);
router.delete("/products/:id", auth_middleware_1.protect, auth_middleware_1.canManageProduct, productsController.delete);
exports.default = router;
