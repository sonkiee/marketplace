import { Request, Response } from "express";
import { VendorService } from "./vendor.service";

export class VendorController {
  constructor(private service: VendorService) {}

  register = async (req: Request, res: Response) => {
    try {
      const userId = req.userId as string;
      const vendor = await this.service.register(userId, req.body);
      return res.status(201).json({
        success: true,
        message: "Vendor registration application submitted successfully",
        data: vendor,
      });
    } catch (e: any) {
      const code = e?.statusCode ?? 500;
      return res.status(code).json({ message: e?.message ?? "Server error" });
    }
  };

  getProfile = async (req: Request, res: Response) => {
    try {
      const userId = req.userId as string;
      const vendor = await this.service.getProfile(userId);
      return res.status(200).json({
        success: true,
        data: vendor,
      });
    } catch (e: any) {
      const code = e?.statusCode ?? 500;
      return res.status(code).json({ message: e?.message ?? "Server error" });
    }
  };

  updateProfile = async (req: Request, res: Response) => {
    try {
      const userId = req.userId as string;
      const vendor = await this.service.updateProfile(userId, req.body);
      return res.status(200).json({
        success: true,
        message: "Vendor profile updated successfully",
        data: vendor,
      });
    } catch (e: any) {
      const code = e?.statusCode ?? 500;
      return res.status(code).json({ message: e?.message ?? "Server error" });
    }
  };

  getDashboardStats = async (req: Request, res: Response) => {
    try {
      const userId = req.userId as string;
      const vendor = await this.service.getProfile(userId);

      if (vendor.status !== "APPROVED") {
        return res.status(403).json({ message: "Vendor profile is not approved" });
      }

      const stats = await this.service.getDashboardStats(vendor.id);
      return res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (e: any) {
      const code = e?.statusCode ?? 500;
      return res.status(code).json({ message: e?.message ?? "Server error" });
    }
  };

  getMyOrders = async (req: Request, res: Response) => {
    try {
      const userId = req.userId as string;
      const vendor = await this.service.getProfile(userId);

      if (vendor.status !== "APPROVED") {
        return res.status(403).json({ message: "Vendor profile is not approved" });
      }

      const orders = await this.service.listOrders(vendor.id);
      return res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (e: any) {
      const code = e?.statusCode ?? 500;
      return res.status(code).json({ message: e?.message ?? "Server error" });
    }
  };
}
