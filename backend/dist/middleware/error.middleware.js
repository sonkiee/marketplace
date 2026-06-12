"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = exports.methodNotAllowedHandler = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const zod_1 = require("zod");
const methodNotAllowedHandler = (req, res) => {
    const error = `method ${req.method} not allowed on ${req.originalUrl}`;
    logger_1.default.warn(error);
    return res.status(405).json({
        message: error,
    });
};
exports.methodNotAllowedHandler = methodNotAllowedHandler;
const notFoundHandler = (req, res) => {
    const error = `path not found for: ${req.method} ${req.originalUrl}`;
    logger_1.default.warn(error);
    return res.status(404).json({
        message: error,
    });
};
exports.notFoundHandler = notFoundHandler;
const isHttpError = (err) => typeof err?.statusCode === "number";
const errorHandler = (err, req, res, next) => {
    if (err instanceof zod_1.ZodError) {
        logger_1.default.warn(`Validation error: ${JSON.stringify(err.issues, null, 2)}`);
        const fields = {};
        for (const issue of err.issues) {
            const field = issue.path.join(".") || "body";
            if (!fields[field])
                fields[field] = issue.message;
        }
        return res.status(400).json({
            // message: "Validation error",
            ...fields,
        });
    }
    // decide status
    const statusCode = isHttpError(err)
        ? err.statusCode
        : res.statusCode >= 400
            ? res.statusCode
            : 500;
    // request id for tracing
    const requestId = crypto.randomUUID();
    const meta = {
        statusCode,
        message: err?.message,
        cause: err?.cause,
        method: req.method,
        path: req.originalUrl,
        // stack: err?.stack,
        detail: err?.detail,
        constraint: err?.constraint,
        table: err?.table,
    };
    // Always log full details on the server
    logger_1.default.error(`Unhandled error:\n${JSON.stringify(meta, null, 2)}`);
    // client-safe message
    const clientMessage = statusCode >= 500
        ? "Internal server error"
        : (err?.message ?? "Request failed");
    // Client response
    return res.status(statusCode).json({
        method: req.method,
        message: clientMessage,
    });
};
exports.errorHandler = errorHandler;
