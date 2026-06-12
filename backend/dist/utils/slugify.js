"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slugify = (s) => s
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
exports.default = slugify;
