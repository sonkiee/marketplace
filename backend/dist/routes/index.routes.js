"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_middleware_1 = require("../middleware/error.middleware");
const api_routes_1 = __importDefault(require("./api.routes"));
const router = (0, express_1.Router)();
// Home route ("/")
router
    .route("/")
    .get((req, res) => res.status(200).json({
    ok: true,
}))
    .all(error_middleware_1.methodNotAllowedHandler);
router
    .route("/api")
    .get((req, res) => res.redirect("/doc"))
    .all(error_middleware_1.methodNotAllowedHandler);
router.use("/api", api_routes_1.default);
router.get("/favicon.ico", (_req, res) => res.status(204).end());
exports.default = router;
