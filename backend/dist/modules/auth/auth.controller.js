"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jwt_1 = require("../../utils/jwt");
const http_only_cookies_1 = require("../../utils/http-only-cookies");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthController {
    constructor(userService) {
        this.userService = userService;
        this.signup = async (req, res) => {
            const { firstName, lastName, email, password } = req.body;
            if (!firstName || !lastName || !email || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const existing = await this.userService.findByEmail(email);
            if (existing)
                return res.status(409).json({ message: "User with email already exist" });
            const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
            const user = await this.userService.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
            });
            const token = (0, jwt_1.sign)(user);
            http_only_cookies_1.cookie.set(res, token);
            return res.status(201).json({ message: "Registration successful" });
        };
        this.signin = async (req, res, next) => {
            const { email, password } = req.body;
            const user = await this.userService.findByEmail(email.toLowerCase().trim());
            if (!user) {
                res.status(401).json({ message: "Invalid email or password" });
                return;
            }
            const match = bcryptjs_1.default.compareSync(password, user.password);
            if (!match) {
                res.status(401).json({ message: "Invalid email or password" });
                return;
            }
            const token = (0, jwt_1.sign)(user);
            http_only_cookies_1.cookie.set(res, token);
            res.json({ message: "Login successful" });
            return;
            // Continue with generating token or other login success logic
        };
        this.me = async (req, res, next) => {
            const userId = req.userId;
            const user = await this.userService.findById(userId);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json({
                userId: user.id,
                role: user.role,
            });
        };
        this.logout = async (req, res) => {
            http_only_cookies_1.cookie.clear(res);
            res.status(200).json({ message: "Logout successful" });
        };
    }
}
exports.AuthController = AuthController;
