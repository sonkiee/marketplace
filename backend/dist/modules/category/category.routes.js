"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const category_service_1 = require("./category.service");
const router = express_1.default.Router();
const categoryController = new category_controller_1.CategoryController(new category_service_1.CategoryService());
router.get("/", categoryController.list);
// router.get("/:id", getCategoryById);
// router.get("/name/:name", getCategoryByName);
exports.default = router;
