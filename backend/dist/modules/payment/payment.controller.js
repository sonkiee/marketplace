"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const payment_service_1 = require("./payment.service");
const paystac_client_1 = require("./paystac.client");
const crypto = __importStar(require("crypto"));
class PaymentsController {
    constructor() {
        this.list = async (req, res) => {
            const payments = await this.service.list();
            return res.status(200).json({ data: payments });
        };
        this.initialize = async (req, res) => {
            const user = req.user;
            const { orderId } = req.body;
            if (!orderId)
                return res.status(400).json({ message: "Missing orderId" });
            if (!user)
                return res.status(404).json({ message: "Youre not authenticated" });
            const data = await this.service.initializePayment({
                userId: user.id, // ensure your AuthRequest user uses uuid id
                userEmail: user.email,
                orderId: String(orderId),
            });
            return res.status(200).json({ data });
        };
        this.getById = async (req, res) => {
            const { id } = req.params;
            const payment = await this.service.getById(id);
            if (!payment) {
                res.status(404).json({ message: "Payment not found" });
                return;
            }
            res.status(200).json({ data: payment });
        };
        this.verify = async (req, res) => {
            const reference = String(req.query.reference ?? "");
            console.log("Verifying payment with reference:", reference);
            if (!reference)
                return res.status(400).json({ message: "Missing reference" });
            const result = await this.service.verifyAndFinalize(reference);
            return res.status(200).json({ message: "Payment successful", ...result });
        };
        this.webhook = async (req, res) => {
            console.log("Received webhook", {
                headers: req.headers,
                body: req.body,
            });
            // Paystack signature verification: x-paystack-signature = HMAC-SHA512(body, secret)
            const secret = process.env.PAYSTACK_SECRET_KEY;
            const signature = req.headers["x-paystack-signature"];
            if (!secret)
                return res.status(500).json({ message: "Server misconfigured" });
            if (!signature)
                return res.status(400).json({ message: "Missing signature" });
            // NOTE: req.body must be raw for signature verification.
            // In Express, use:
            // app.post("/webhook", express.raw({ type: "application/json" }), controller.webhook)
            // and then JSON.parse(req.body.toString()) below.
            const rawBody = req.body;
            if (!Buffer.isBuffer(rawBody)) {
                return res.status(500).json({
                    message: "Expected raw Buffer body",
                });
            }
            const computed = crypto
                .createHmac("sha512", secret)
                .update(rawBody)
                .digest("hex");
            if (computed !== signature) {
                return res.status(401).json({ message: "Invalid signature" });
            }
            const event = JSON.parse(rawBody.toString("utf8"));
            try {
                const eventType = event?.event;
                if (eventType === "charge.success") {
                    const reference = event?.data?.reference;
                    const amount = event?.data?.amount;
                    const currency = event?.data?.currency;
                    if (!reference || !amount || !currency)
                        return res.status(400).send("Missing reference");
                    // Store raw webhook payload if you want:
                    await this.service["handleSuccessfulPayment"](reference, amount, currency);
                    return res.status(200).json({ message: "ok" });
                }
                return res.status(200).send("ignored");
            }
            catch (e) {
                return res.status(500).send(e?.message ?? "Webhook error");
            }
        };
        const secret = process.env.PAYSTACK_SECRET_KEY;
        if (!secret)
            throw new Error("PAYSTACK_SECRET_KEY is missing");
        this.service = new payment_service_1.PaymentService(new paystac_client_1.PaystackClient(secret));
    }
}
exports.PaymentsController = PaymentsController;
