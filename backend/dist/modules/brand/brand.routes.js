"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brand_controller_1 = require("./brand.controller");
const brand_service_1 = require("./brand.service");
const router = (0, express_1.Router)();
const brandController = new brand_controller_1.BrandController(new brand_service_1.BrandService());
router.get("/", brandController.list);
exports.default = router;
