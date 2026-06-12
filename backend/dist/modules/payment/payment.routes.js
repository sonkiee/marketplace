"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = express_1.default.Router();
const paymentController = new payment_controller_1.PaymentsController();
router.post("/init", auth_middleware_1.protect, paymentController.initialize);
router.get("/verify", paymentController.verify);
// router.post(
//   "/webhook",
//   express.raw({
//     type: "application/json",
//   }),
//   paymentController.webhook,
// );
exports.default = router;
