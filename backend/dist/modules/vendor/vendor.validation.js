"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVendorSchema = exports.registerVendorSchema = void 0;
const z = __importStar(require("zod"));
exports.registerVendorSchema = z.object({
    businessName: z.string().min(2, "Business name must be at least 2 characters").max(180),
    businessEmail: z.email("Invalid business email address").max(180),
    phone: z.string().min(5, "Phone number must be at least 5 characters").max(20),
    description: z.string().optional().nullable(),
    logo: z.string().url("Invalid logo URL").optional().nullable().or(z.literal("")),
    banner: z.string().url("Invalid banner URL").optional().nullable().or(z.literal("")),
    address: z.string().optional().nullable(),
});
exports.updateVendorSchema = exports.registerVendorSchema.partial();
