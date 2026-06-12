"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
        this.listOrders = async (_req, res, next) => {
            try {
                const orders = await this.orderService.listAll();
                if (orders.length === 0) {
                    res.status(404).json({ message: "No orders found" });
                    return;
                }
                res.status(200).json({
                    success: true,
                    message: "Orders retrieved successfully",
                    data: orders,
                });
            }
            catch (err) {
                next(err);
            }
        };
        this.getOrder = async (req, res) => {
            const { id } = req.params;
            const order = await this.orderService.findById(id);
            if (!order) {
                res.status(404).json({ message: "Order not found" });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Order details retrieved successfully",
                data: order,
            });
        };
        this.listMyOrders = async (req, res, next) => {
            try {
                const userId = req.user?.id;
                if (!userId) {
                    res.status(401).json({ message: "Not authenticated" });
                    return;
                }
                const orders = await this.orderService.listByUser(userId);
                res.status(200).json({
                    success: true,
                    message: "Orders retrieved successfully",
                    data: orders,
                });
            }
            catch (err) {
                next(err);
            }
        };
        this.getMyOrder = async (req, res, next) => {
            try {
                const userId = req.user?.id;
                if (!userId) {
                    res.status(401).json({ message: "Not authenticated" });
                    return;
                }
                const { id } = req.params;
                const order = await this.orderService.findById(id);
                if (!order || order.userId !== userId) {
                    res.status(404).json({ message: "Order not found" });
                    return;
                }
                res.status(200).json({ success: true, data: order });
            }
            catch (err) {
                next(err);
            }
        };
        this.newOrder = async (req, res, next) => {
            try {
                const userId = req.user?.id;
                if (!userId) {
                    res.status(401).json({ message: "Not authenticated" });
                    return;
                }
                const body = req.body;
                if (!body?.items ||
                    !Array.isArray(body.items) ||
                    body.items.length === 0) {
                    res.status(400).json({ message: "items must be a non-empty array" });
                    return;
                }
                if (!body?.shippingAddress) {
                    res.status(400).json({ message: "shippingAddress is required" });
                    return;
                }
                const created = await this.orderService.createForUser(userId, body);
                res.status(201).json({
                    success: true,
                    message: "Order created successfully",
                    data: created,
                });
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.OrderController = OrderController;
