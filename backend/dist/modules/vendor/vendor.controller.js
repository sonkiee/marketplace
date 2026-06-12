"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorController = void 0;
class VendorController {
    constructor(service) {
        this.service = service;
        this.register = async (req, res) => {
            try {
                const userId = req.userId;
                const vendor = await this.service.register(userId, req.body);
                return res.status(201).json({
                    success: true,
                    message: "Vendor registration application submitted successfully",
                    data: vendor,
                });
            }
            catch (e) {
                const code = e?.statusCode ?? 500;
                return res.status(code).json({ message: e?.message ?? "Server error" });
            }
        };
        this.getProfile = async (req, res) => {
            try {
                const userId = req.userId;
                const vendor = await this.service.getProfile(userId);
                return res.status(200).json({
                    success: true,
                    data: vendor,
                });
            }
            catch (e) {
                const code = e?.statusCode ?? 500;
                return res.status(code).json({ message: e?.message ?? "Server error" });
            }
        };
        this.updateProfile = async (req, res) => {
            try {
                const userId = req.userId;
                const vendor = await this.service.updateProfile(userId, req.body);
                return res.status(200).json({
                    success: true,
                    message: "Vendor profile updated successfully",
                    data: vendor,
                });
            }
            catch (e) {
                const code = e?.statusCode ?? 500;
                return res.status(code).json({ message: e?.message ?? "Server error" });
            }
        };
        this.getDashboardStats = async (req, res) => {
            try {
                const userId = req.userId;
                const vendor = await this.service.getProfile(userId);
                if (vendor.status !== "APPROVED") {
                    return res.status(403).json({ message: "Vendor profile is not approved" });
                }
                const stats = await this.service.getDashboardStats(vendor.id);
                return res.status(200).json({
                    success: true,
                    data: stats,
                });
            }
            catch (e) {
                const code = e?.statusCode ?? 500;
                return res.status(code).json({ message: e?.message ?? "Server error" });
            }
        };
        this.getMyOrders = async (req, res) => {
            try {
                const userId = req.userId;
                const vendor = await this.service.getProfile(userId);
                if (vendor.status !== "APPROVED") {
                    return res.status(403).json({ message: "Vendor profile is not approved" });
                }
                const orders = await this.service.listOrders(vendor.id);
                return res.status(200).json({
                    success: true,
                    data: orders,
                });
            }
            catch (e) {
                const code = e?.statusCode ?? 500;
                return res.status(code).json({ message: e?.message ?? "Server error" });
            }
        };
    }
}
exports.VendorController = VendorController;
