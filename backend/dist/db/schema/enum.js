"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveryMethodEnum = exports.addressLabelEnum = exports.cartStatusEnum = exports.paymentStatusEnum = exports.orderStatusEnum = exports.productConditionEnum = exports.categoryNameEnum = exports.vendorStatusEnum = exports.userRoleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.userRoleEnum = (0, pg_core_1.pgEnum)("user_role", ["customer", "admin", "vendor"]);
exports.vendorStatusEnum = (0, pg_core_1.pgEnum)("vendor_status", [
    "PENDING",
    "APPROVED",
    "REJECTED",
    "SUSPENDED",
]);
exports.categoryNameEnum = (0, pg_core_1.pgEnum)("category_name", [
    "iphone",
    "samsung",
    "accessories",
    "tablet",
    "smartphones",
]);
exports.productConditionEnum = (0, pg_core_1.pgEnum)("product_condition", [
    "new",
    "used",
    "nigerian_used",
    "refurbished",
]);
exports.orderStatusEnum = (0, pg_core_1.pgEnum)("order_status", [
    "pending_payment",
    "paid",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "refunded",
]);
exports.paymentStatusEnum = (0, pg_core_1.pgEnum)("payment_status", [
    "initiated",
    "success",
    "failed",
    "refunded",
]);
exports.cartStatusEnum = (0, pg_core_1.pgEnum)("cart_status", [
    "active",
    "converted",
    "abandoned",
]);
exports.addressLabelEnum = (0, pg_core_1.pgEnum)("address_label", [
    "primary",
    "secondary",
]);
exports.deliveryMethodEnum = (0, pg_core_1.pgEnum)("delivery_method", [
    "delivery",
    "pickup",
]);
