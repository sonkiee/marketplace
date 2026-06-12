"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackClient = void 0;
const axios_1 = __importDefault(require("axios"));
class PaystackClient {
    constructor(secretKey, baseUrl = "https://api.paystack.co") {
        this.secretKey = secretKey;
        this.baseUrl = baseUrl;
        this.initialize = async (payload) => {
            const res = await axios_1.default.post(`${this.baseUrl}/transaction/initialize`, {
                amount: payload.amountKobo,
                email: payload.email,
                reference: payload.reference,
                currency: payload.currency ?? "NGN",
                metadata: payload.metadata ?? {},
            }, {
                headers: {
                    Authorization: `Bearer ${this.secretKey}`,
                    "Content-Type": "application/json",
                },
                timeout: 20000,
            });
            return res.data;
        };
        this.verify = async (reference) => {
            const res = await axios_1.default.get(`${this.baseUrl}/transaction/verify/${encodeURIComponent(reference)}`, {
                headers: {
                    Authorization: `Bearer ${this.secretKey}`,
                    "Content-Type": "application/json",
                },
                timeout: 20000,
            });
            return res.data;
        };
    }
}
exports.PaystackClient = PaystackClient;
