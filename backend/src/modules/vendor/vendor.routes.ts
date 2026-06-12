import { Router } from "express";
import { VendorController } from "./vendor.controller";
import { VendorService } from "./vendor.service";
import { protect, isApprovedVendor, canManageProduct } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { registerVendorSchema, updateVendorSchema } from "./vendor.validation";
import { ProductsController } from "../product/product.controller";
import { ProductsService } from "../product/product.service";
import { upload } from "../../middleware/upload.middleware";

const router = Router();
const controller = new VendorController(new VendorService());
const productsController = new ProductsController(new ProductsService());

// Public onboarding: anyone logged in can register as a vendor
router.post("/register", protect, validate(registerVendorSchema), controller.register);

// Profile management for the logged-in vendor
router.get("/profile", protect, controller.getProfile);
router.put("/profile", protect, validate(updateVendorSchema), controller.updateProfile);

// Vendor dashboard and orders management
router.get("/dashboard", protect, controller.getDashboardStats);
router.get("/orders", protect, controller.getMyOrders);

// Vendor product management routes
router.get("/products", protect, isApprovedVendor, async (req: any, res: any) => {
  // Inject vendorId filter to return only their own products
  req.query.vendorId = req.vendor.id;
  return productsController.list(req, res);
});
router.post("/products", protect, isApprovedVendor, upload.array("files", 5), productsController.create);
router.put("/products/:id", protect, canManageProduct, productsController.update);
router.delete("/products/:id", protect, canManageProduct, productsController.delete);

export default router;
