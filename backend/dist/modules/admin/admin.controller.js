"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
class AdminController {
    constructor(userService) {
        this.userService = userService;
        this.dashboard = async (req, res) => {
            return res.json({ message: "Admin dashboard" });
        };
        this.promote = async (req, res) => {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ message: "Email is required" });
            }
            const admin = await this.userService.promote(email);
            return res.json(admin);
        };
        this.listVendors = async (req, res) => {
            const status = req.query.status;
            try {
                const condition = status ? (0, drizzle_orm_1.eq)(schema_1.vendors.status, status) : undefined;
                const list = await db_1.db.query.vendors.findMany({
                    where: condition,
                    orderBy: (v, { desc }) => [desc(v.createdAt)],
                    with: {
                        user: {
                            columns: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true,
                            },
                        },
                    },
                });
                return res.status(200).json({
                    success: true,
                    data: list,
                });
            }
            catch (e) {
                return res.status(500).json({ message: e?.message ?? "Server error" });
            }
        };
        this.getVendorById = async (req, res) => {
            const id = req.params.id;
            try {
                const vendor = await db_1.db.query.vendors.findFirst({
                    where: (0, drizzle_orm_1.eq)(schema_1.vendors.id, id),
                    with: {
                        user: {
                            columns: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true,
                            },
                        },
                    },
                });
                if (!vendor) {
                    return res.status(404).json({ message: "Vendor not found" });
                }
                return res.status(200).json({
                    success: true,
                    data: vendor,
                });
            }
            catch (e) {
                return res.status(500).json({ message: e?.message ?? "Server error" });
            }
        };
        this.updateVendorStatus = async (req, res) => {
            const id = req.params.id;
            const { status } = req.body;
            if (!["PENDING", "APPROVED", "REJECTED", "SUSPENDED"].includes(status)) {
                return res.status(400).json({ message: "Invalid status. Must be one of PENDING, APPROVED, REJECTED, SUSPENDED" });
            }
            try {
                const updated = await db_1.db.transaction(async (tx) => {
                    const vendor = await tx.query.vendors.findFirst({
                        where: (0, drizzle_orm_1.eq)(schema_1.vendors.id, id),
                    });
                    if (!vendor) {
                        throw Object.assign(new Error("Vendor not found"), { statusCode: 404 });
                    }
                    const [updatedVendor] = await tx
                        .update(schema_1.vendors)
                        .set({ status, updatedAt: new Date() })
                        .where((0, drizzle_orm_1.eq)(schema_1.vendors.id, id))
                        .returning();
                    // If approved, update user's role to 'vendor'
                    if (status === "APPROVED") {
                        await tx
                            .update(schema_1.users)
                            .set({ role: "vendor", updatedAt: new Date() })
                            .where((0, drizzle_orm_1.eq)(schema_1.users.id, vendor.userId));
                    }
                    else if (status === "SUSPENDED" || status === "REJECTED") {
                        // Demote to customer if suspended or rejected
                        await tx
                            .update(schema_1.users)
                            .set({ role: "customer", updatedAt: new Date() })
                            .where((0, drizzle_orm_1.eq)(schema_1.users.id, vendor.userId));
                    }
                    return updatedVendor;
                });
                return res.status(200).json({
                    success: true,
                    message: `Vendor status successfully updated to ${status}`,
                    data: updated,
                });
            }
            catch (e) {
                const code = e?.statusCode ?? 500;
                return res.status(code).json({ message: e?.message ?? "Server error" });
            }
        };
    }
}
exports.AdminController = AdminController;
