"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("../modules/user/user.routes"));
const product_routes_1 = __importDefault(require("../modules/product/product.routes"));
const category_routes_1 = __importDefault(require("../modules/category/category.routes"));
const payment_routes_1 = __importDefault(require("../modules/payment/payment.routes"));
const order_routes_1 = __importDefault(require("../modules/order/order.routes"));
const admin_routes_1 = __importDefault(require("../modules/admin/admin.routes"));
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const brand_routes_1 = __importDefault(require("../modules/brand/brand.routes"));
const vendor_routes_1 = __importDefault(require("../modules/vendor/vendor.routes"));
const router = (0, express_1.Router)();
router.use("/auth", auth_routes_1.default); // Authentication middleware
router.use("/user", user_routes_1.default);
router.use("/vendors", vendor_routes_1.default);
router.use("/brands", brand_routes_1.default);
router.use("/products", product_routes_1.default);
router.use("/order/payment", payment_routes_1.default);
router.use("/orders", order_routes_1.default);
router.use("/categories", category_routes_1.default);
// router.use("/banners", banner);
router.use("/admin", admin_routes_1.default);
// router.use("/user/address", address);
// router.use("/uploads", express.static("public/uploads"));
exports.default = router;
