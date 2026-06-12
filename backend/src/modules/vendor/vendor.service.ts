import { and, eq, sql } from "drizzle-orm";
import { db } from "../../db";
import { vendors, users, orderItems, products, productVariants } from "../../db/schema";

export class VendorService {
  register = async (userId: string, data: any) => {
    // 1. Check if user already has a vendor profile
    const existingByUser = await db.query.vendors.findFirst({
      where: eq(vendors.userId, userId),
    });
    if (existingByUser) {
      throw Object.assign(new Error("User already has a vendor profile application"), { statusCode: 409 });
    }

    // 2. Check if business email is already registered
    const existingByEmail = await db.query.vendors.findFirst({
      where: eq(vendors.businessEmail, data.businessEmail.toLowerCase().trim()),
    });
    if (existingByEmail) {
      throw Object.assign(new Error("Business email is already registered"), { statusCode: 409 });
    }

    const [vendor] = await db
      .insert(vendors)
      .values({
        userId,
        businessName: data.businessName.trim(),
        businessEmail: data.businessEmail.toLowerCase().trim(),
        phone: data.phone.trim(),
        description: data.description ?? null,
        logo: data.logo ?? null,
        banner: data.banner ?? null,
        address: data.address ?? null,
        status: "PENDING",
      })
      .returning();

    return vendor;
  };

  getProfile = async (userId: string) => {
    const vendor = await db.query.vendors.findFirst({
      where: eq(vendors.userId, userId),
    });
    if (!vendor) {
      throw Object.assign(new Error("Vendor profile not found"), { statusCode: 404 });
    }
    return vendor;
  };

  getProfileById = async (vendorId: string) => {
    const vendor = await db.query.vendors.findFirst({
      where: eq(vendors.id, vendorId),
    });
    if (!vendor) {
      throw Object.assign(new Error("Vendor profile not found"), { statusCode: 404 });
    }
    return vendor;
  };

  updateProfile = async (userId: string, data: any) => {
    const vendor = await this.getProfile(userId);

    if (data.businessEmail) {
      const email = data.businessEmail.toLowerCase().trim();
      if (email !== vendor.businessEmail) {
        const existing = await db.query.vendors.findFirst({
          where: eq(vendors.businessEmail, email),
        });
        if (existing) {
          throw Object.assign(new Error("Business email is already registered"), { statusCode: 409 });
        }
      }
    }

    const [updated] = await db
      .update(vendors)
      .set({
        businessName: data.businessName?.trim() ?? vendor.businessName,
        businessEmail: data.businessEmail?.toLowerCase().trim() ?? vendor.businessEmail,
        phone: data.phone?.trim() ?? vendor.phone,
        description: data.description !== undefined ? data.description : vendor.description,
        logo: data.logo !== undefined ? data.logo : vendor.logo,
        banner: data.banner !== undefined ? data.banner : vendor.banner,
        address: data.address !== undefined ? data.address : vendor.address,
        updatedAt: new Date(),
      })
      .where(eq(vendors.id, vendor.id))
      .returning();

    return updated;
  };

  getDashboardStats = async (vendorId: string) => {
    // 1. Calculate total revenue and items sold from order_items
    const salesRes = await db
      .select({
        revenue: sql<string>`coalesce(sum(${orderItems.unitPrice}::numeric * ${orderItems.qty}), 0)`,
        itemsSold: sql<string>`coalesce(sum(${orderItems.qty}), 0)`,
        orderCount: sql<string>`count(distinct ${orderItems.orderId})`,
      })
      .from(orderItems)
      .where(eq(orderItems.vendorId, vendorId));

    const revenue = Number(salesRes[0]?.revenue ?? 0);
    const itemsSold = Number(salesRes[0]?.itemsSold ?? 0);
    const orderCount = Number(salesRes[0]?.orderCount ?? 0);

    // 2. Out of stock products count
    const outOfStockRes = await db
      .select({
        count: sql<string>`count(distinct ${productVariants.id})`,
      })
      .from(productVariants)
      .innerJoin(products, eq(products.id, productVariants.productId))
      .where(
        and(
          eq(products.vendorId, vendorId),
          eq(productVariants.stockQty, 0)
        )
      );

    const outOfStockCount = Number(outOfStockRes[0]?.count ?? 0);

    // 3. Recent orders (order items belonging to this vendor)
    const recentItems = await db.query.orderItems.findMany({
      where: eq(orderItems.vendorId, vendorId),
      orderBy: (oi, { desc }) => [desc(oi.createdAt)],
      limit: 10,
      with: {
        order: {
          with: {
            user: {
              columns: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return {
      revenue,
      itemsSold,
      orderCount,
      outOfStockCount,
      recentOrders: recentItems.map((item) => ({
        orderItemId: item.id,
        orderId: item.orderId,
        orderNumber: item.order?.orderNumber,
        status: item.order?.status,
        createdAt: item.order?.createdAt,
        productTitle: item.productTitleSnapshot,
        qty: item.qty,
        unitPrice: item.unitPrice,
        customerName: item.order?.user
          ? `${item.order.user.firstName} ${item.order.user.lastName}`
          : "Customer",
        customerEmail: item.order?.user?.email,
      })),
    };
  };

  listOrders = async (vendorId: string) => {
    const items = await db.query.orderItems.findMany({
      where: eq(orderItems.vendorId, vendorId),
      orderBy: (oi, { desc }) => [desc(oi.createdAt)],
      with: {
        order: {
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
        },
      },
    });

    return items;
  };
}
