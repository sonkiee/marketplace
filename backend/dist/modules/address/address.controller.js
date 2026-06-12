"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
class AddressController {
    constructor(addressService) {
        this.addressService = addressService;
        this.createAddress = async (req, res, next) => {
            try {
                const userId = req.user?.id;
                if (!userId) {
                    res.status(401).json({ message: "Not authenticated" });
                    return;
                }
                const body = req.body;
                // Minimal validation (you can replace with Zod later)
                if (!body?.address || !body?.city || !body?.state || !body?.zip) {
                    res.status(400).json({ message: "Please enter all required fields" });
                    return;
                }
                const created = await this.addressService.createForUser(userId, body);
                res.status(201).json({
                    success: true,
                    message: "Address added successfully",
                    data: created,
                });
            }
            catch (err) {
                next(err);
            }
        };
        this.getMyAddresses = async (req, res, next) => {
            try {
                const userId = req.user?.id;
                if (!userId) {
                    res.status(401).json({ message: "Not authenticated" });
                    return;
                }
                const list = await this.addressService.listByUser(userId);
                res.status(200).json({
                    success: true,
                    message: "Addresses retrieved successfully",
                    data: list,
                });
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.AddressController = AddressController;
