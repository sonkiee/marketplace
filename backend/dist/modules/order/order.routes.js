"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const order_service_1 = require("./order.service");
const auth_middleware_1 = require("../../middleware/auth.middleware");
// import { validateObjectId } from "../utils/mongodb-validation";
const router = express_1.default.Router();
const orderController = new order_controller_1.OrderController(new order_service_1.OrderService());
router.get("/", auth_middleware_1.protect, orderController.listMyOrders);
router.get("/:id/", auth_middleware_1.protect, orderController.getMyOrder);
router.post("/", auth_middleware_1.protect, orderController.newOrder);
exports.default = router;
