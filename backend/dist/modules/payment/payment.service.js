"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../../db");
const schema_1 = require("../../db/schema"); // adjust to your schema names
const is_uuid_1 = require("../../utils/is-uuid");
const toKobo = (naira) => Math.round(Number(naira) * 100);
class PaymentService {
    constructor(paystack) {
        this.paystack = paystack;
        this.list = async () => {
            return db_1.db.query.payments.findMany({
                orderBy: (p, { desc }) => [desc(p.createdAt)],
                with: {
                    user: true,
                },
            });
        };
        this.getByReference = async (reference) => {
            return db_1.db.query.payments.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.payments.reference, reference),
                with: {
                    user: true,
                },
            });
        };
        this.getByOrderId = async (orderId) => {
            return db_1.db.query.payments.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.payments.orderId, orderId),
                with: {
                    user: true,
                },
            });
        };
        this.getById = async (id) => {
            return db_1.db.query.payments.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.payments.id, id),
                with: {
                    user: true,
                },
            });
        };
        this.initializePayment = async (args) => {
            if (!(0, is_uuid_1.isUUID)(args.orderId)) {
                const err = new Error("Invalid order ID");
                err.statusCode = 400;
                throw err;
            }
            return await db_1.db.transaction(async (tx) => {
                const order = await tx.query.orders.findFirst({
                    where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.orders.id, args.orderId), (0, drizzle_orm_1.eq)(schema_1.orders.userId, args.userId)),
                });
                if (!order) {
                    const err = new Error("Order not found");
                    err.statusCode = 404;
                    throw err;
                }
                if (order.status === "paid") {
                    const err = new Error("Order already paid");
                    err.statusCode = 409;
                    throw err;
                }
                // Ensure reference exists (generate once). Use a stable reference format.
                const reference = this.makeReference(order.id);
                // Create (or upsert) payment row in initiated state
                // Because reference is unique, insert may conflict if retry. Use onConflictDoUpdate if you want.
                await tx
                    .insert(schema_1.payments)
                    .values({
                    userId: args.userId,
                    orderId: order.id,
                    provider: "paystack",
                    reference,
                    amount: order.total, // naira
                    status: "initiated",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
                    .onConflictDoUpdate({
                    target: schema_1.payments.reference,
                    set: {
                        updatedAt: new Date(),
                        status: "initiated",
                    },
                });
                const ps = await this.paystack.initialize({
                    amountKobo: toKobo(order.total), // convert to kobo
                    email: args.userEmail,
                    reference,
                    currency: "NGN",
                    metadata: { orderId: order.id },
                });
                return {
                    authorizationUrl: ps.data.authorization_url,
                    reference,
                    access_code: ps.data.access_code,
                };
            });
        };
        this.verifyAndFinalize = async (reference) => {
            const verify = await this.paystack.verify(reference);
            if (!verify.status) {
                const err = new Error(verify.message || "Verification failed");
                err.statusCode = 400;
                throw err;
            }
            if (verify.data.status !== "success") {
                const err = new Error("Payment not successful");
                err.statusCode = 400;
                throw err;
            }
            // Optional: validate amount/currency here before marking paid
            // e.g. compare verify.data.amount (kobo) with order.totalAmount*100
            const finalize = await this.handleSuccessfulPayment(reference, verify.data.amount, verify.data.currency);
            return {
                ...finalize,
                payment: {
                    reference,
                    status: verify.data.status,
                    amountKobo: verify.data.amount,
                    currency: verify.data.currency,
                },
            };
        };
        this.handleSuccessfulPayment = async (reference, amountKobo, currency) => {
            return db_1.db.transaction(async (tx) => {
                const payment = await tx.query.payments.findFirst({
                    where: (0, drizzle_orm_1.eq)(schema_1.payments.reference, reference),
                });
                if (!payment) {
                    const err = new Error("Payment reference not found");
                    err.statusCode = 404;
                    throw err;
                }
                const order = await tx.query.orders.findFirst({
                    where: (0, drizzle_orm_1.eq)(schema_1.orders.id, payment.orderId),
                });
                if (!order) {
                    const err = new Error("Order not found for payment");
                    err.statusCode = 404;
                    throw err;
                }
                // Idempotent: if already paid, stop
                if (payment.status === "success" && order.status !== "pending_payment") {
                    return { alreadyProcessed: true, orderId: order.id };
                }
                // Validate amount/currency (recommended)
                const expectedKobo = toKobo(order.total);
                if (currency !== "NGN" || amountKobo !== expectedKobo) {
                    const err = new Error("Amount/currency mismatch");
                    err.statusCode = 409;
                    throw err;
                }
                // Load order items
                const items = await tx.query.orderItems.findMany({
                    where: (0, drizzle_orm_1.eq)(schema_1.orderItems.orderId, order.id),
                });
                // Stock check & deduction per variant (simple safe version)
                // MVP approach: for each item, read variant and update with guard.
                const variantIds = items
                    .map((i) => i.variantId)
                    .filter(Boolean);
                const variants = await tx.query.productVariants.findMany({
                    where: (0, drizzle_orm_1.inArray)(schema_1.productVariants.id, variantIds),
                });
                const byId = new Map(variants.map((v) => [v.id, v]));
                for (const it of items) {
                    if (!it.variantId)
                        continue; // in case variant deleted (set null). snapshot still exists.
                    const v = byId.get(it.variantId);
                    if (!v) {
                        const err = new Error(`Variant missing: ${it.variantId}`);
                        err.statusCode = 409;
                        throw err;
                    }
                    if (v.stockQty < it.qty) {
                        const err = new Error(`Insufficient stock for variant ${v.id}`);
                        err.statusCode = 409;
                        throw err;
                    }
                    // Deduct stock
                    await tx
                        .update(schema_1.productVariants)
                        .set({ stockQty: v.stockQty - it.qty, updatedAt: new Date() })
                        .where((0, drizzle_orm_1.eq)(schema_1.productVariants.id, v.id));
                }
                // Mark payment paid
                await tx
                    .update(schema_1.payments)
                    .set({ status: "success", updatedAt: new Date() })
                    .where((0, drizzle_orm_1.eq)(schema_1.payments.id, payment.id));
                // Update order status
                await tx
                    .update(schema_1.orders)
                    .set({ status: "processing", updatedAt: new Date() })
                    .where((0, drizzle_orm_1.eq)(schema_1.orders.id, order.id));
                return { alreadyProcessed: false, orderId: order.id };
            });
        };
    }
    makeReference(orderId) {
        return `ord_${orderId}_${Date.now()}`; // stable enough for MVP
    }
}
exports.PaymentService = PaymentService;
