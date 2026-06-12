"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const product_service_1 = require("./product.service");
// import { protect } from "../middleware/auth.middleware";
// import { upload } from "../middleware/upload.middleware";
// import { validateObjectId } from "../utils/mongodb-validation";
const router = express_1.default.Router();
const productsController = new product_controller_1.ProductsController(new product_service_1.ProductsService());
router.get("/", productsController.list);
router.get("/:identifier", productsController.getOne);
// router.get("/:slug", productsController.getBySlug);
exports.default = router;
