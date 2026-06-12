import express from "express";
import { OrderController } from "../order/order.controller";
import { OrderService } from "../order/order.service";
import { PaymentsController } from "../payment/payment.controller";
import { UserController } from "../user/user.controller";
import { UserService } from "../user/user.service";
import { ProductsController } from "../product/product.controller";
import { ProductsService } from "../product/product.service";
import { upload } from "../../middleware/upload.middleware";
import { BrandController } from "../brand/brand.controller";
import { BrandService } from "../brand/brand.service";
import { CategoryController } from "../category/category.controller";
import { CategoryService } from "../category/category.service";
import { AdminController } from "./admin.controller";
import { protect, admin as adminAuth } from "../../middleware/auth.middleware";

const router = express.Router();

// Apply admin protection to all admin endpoints
router.use(protect, adminAuth);

const orderController = new OrderController(new OrderService());
const paymentController = new PaymentsController();
const userController = new UserController(new UserService());
const productsController = new ProductsController(new ProductsService());

const brandController = new BrandController(new BrandService());
const categoryController = new CategoryController(new CategoryService());
const adminController = new AdminController(new UserService());

router.get("/orders", orderController.listOrders);
router.get("/payments", paymentController.list);
router.get("/users", userController.list);

router.get("/products", productsController.list);

router.get("/users/:id", userController.getUserById);
router.get("/payments/:id", paymentController.getById);
router.get("/orders/:id", orderController.getOrder);

router.post("/products", upload.array("files", 5), productsController.create);

router.get("/brands", brandController.list);
router.get("/categories", categoryController.list);

router.post("/promote", adminController.promote);

router.delete("/products/:id/images/:imageId", productsController.delete_image);

// Vendor management routes
router.get("/vendors", adminController.listVendors);
router.get("/vendors/:id", adminController.getVendorById);
router.put("/vendors/:id/status", adminController.updateVendorStatus);

export default router;
