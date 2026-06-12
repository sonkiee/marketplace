"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.list = async (req, res) => {
            const users = await this.userService.list();
            return res.status(200).json({ data: users });
        };
        this.getProfile = async (req, res) => {
            const userId = req.user?.id;
            console.log("User ID from token:", userId);
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const user = await this.userService.findById(userId);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                createdAt: user.createdAt,
            });
        };
        this.getUserById = async (req, res) => {
            const { id } = req.params;
            const user = await this.userService.findById(id);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                createdAt: user.createdAt,
            });
        };
        this.updateProfile = async (req, res) => {
            const userId = req.user?.id;
            console.log("User ID from token:", userId);
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const user = await this.userService.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const { firstName, lastName, phone } = req.body;
            const updatedUser = await this.userService.updateProfile(userId, {
                firstName,
                lastName,
                phone,
            });
            res.status(200).json({
                id: updatedUser.id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                phone: updatedUser.phone,
                createdAt: updatedUser.createdAt,
            });
        };
    }
}
exports.UserController = UserController;
