import { Response, NextFunction, Request } from "express";
import { verify } from "../utils/jwt";
import { db } from "../db";
import { vendors, products } from "../db/schema";
import { eq } from "drizzle-orm";

function getToken(req: any): string | undefined {
  return req.cookies?.access_token;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = getToken(req);

  if (!token) {
    res.status(401).json({ message: "Verily, You must be logged in" });
    return;
  }

  try {
    const decoded = verify(token) as { id: string };
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, decoded.id),
    });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    req.userId = user.id;
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ message: "Admin access required" });
};

export const isApprovedVendor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Admins bypass vendor status check
  if (req.user.role === "admin") {
    return next();
  }

  const vendor = await db.query.vendors.findFirst({
    where: eq(vendors.userId, req.user.id),
  });

  if (!vendor || vendor.status !== "APPROVED") {
    return res.status(403).json({ message: "Approved vendor profile required" });
  }

  req.vendor = vendor;
  return next();
};

export const canManageProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Admins bypass ownership check
  if (req.user.role === "admin") {
    return next();
  }

  const productId = req.params.id as string;
  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const vendor = await db.query.vendors.findFirst({
    where: eq(vendors.userId, req.user.id),
  });

  if (!vendor || vendor.status !== "APPROVED") {
    return res.status(403).json({ message: "Approved vendor profile required" });
  }

  if (product.vendorId !== vendor.id) {
    return res.status(403).json({ message: "You are not authorized to manage this product" });
  }

  req.vendor = vendor;
  return next();
};
