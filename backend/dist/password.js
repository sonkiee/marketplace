#!/usr/bin/env ts-node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const password = process.argv[2];
if (!password) {
    console.error("Usage: ts-node hash.ts <password>");
    process.exit(1);
}
(async () => {
    const hash = await bcryptjs_1.default.hash(password, 10);
    console.log(hash);
})();
