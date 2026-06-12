import { Request, Response } from "express";
import { UserService } from "../user/user.service";
import { db } from "../../db";
import { vendors, users } from "../../db/schema";
import { eq } from "drizzle-orm";

export class AdminController {
  constructor(private userService: UserService) {}

  dashboard = async (
    req: Request,
    res: Response,
  ): Promise<Response<{ message: string }>> => {
    return res.json({ message: "Admin dashboard" });
  };

  promote = async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const admin = await this.userService.promote(email);
    return res.json(admin);
  };

  listVendors = async (req: Request, res: Response) => {
    const status = req.query.status as string | undefined;

    try {
      const condition = status ? eq(vendors.status, status as any) : undefined;

      const list = await db.query.vendors.findMany({
        where: condition,
        orderBy: (v, { desc }) => [desc(v.createdAt)],
        with: {
          user: {
            columns: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });

      return res.status(200).json({
        success: true,
        data: list,
      });
    } catch (e: any) {
      return res.status(500).json({ message: e?.message ?? "Server error" });
    }
  };

  getVendorById = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    try {
      const vendor = await db.query.vendors.findFirst({
        where: eq(vendors.id, id),
        with: {
          user: {
            columns: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });

      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }

      return res.status(200).json({
        success: true,
        data: vendor,
      });
    } catch (e: any) {
      return res.status(500).json({ message: e?.message ?? "Server error" });
    }
  };

  updateVendorStatus = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const { status } = req.body;

    if (!["PENDING", "APPROVED", "REJECTED", "SUSPENDED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Must be one of PENDING, APPROVED, REJECTED, SUSPENDED" });
    }

    try {
      const updated = await db.transaction(async (tx) => {
        const vendor = await tx.query.vendors.findFirst({
          where: eq(vendors.id, id),
        });

        if (!vendor) {
          throw Object.assign(new Error("Vendor not found"), { statusCode: 404 });
        }

        const [updatedVendor] = await tx
          .update(vendors)
          .set({ status, updatedAt: new Date() })
          .where(eq(vendors.id, id))
          .returning();

        // If approved, update user's role to 'vendor'
        if (status === "APPROVED") {
          await tx
            .update(users)
            .set({ role: "vendor", updatedAt: new Date() })
            .where(eq(users.id, vendor.userId));
        } else if (status === "SUSPENDED" || status === "REJECTED") {
          // Demote to customer if suspended or rejected
          await tx
            .update(users)
            .set({ role: "customer", updatedAt: new Date() })
            .where(eq(users.id, vendor.userId));
        }

        return updatedVendor;
      });

      return res.status(200).json({
        success: true,
        message: `Vendor status successfully updated to ${status}`,
        data: updated,
      });
    } catch (e: any) {
      const code = e?.statusCode ?? 500;
      return res.status(code).json({ message: e?.message ?? "Server error" });
    }
  };
}
