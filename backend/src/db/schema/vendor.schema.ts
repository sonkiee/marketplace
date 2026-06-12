import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
  index,
} from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { vendorStatusEnum } from "./enum";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { products } from "./product.schema";

export const vendors = pgTable(
  "vendors",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    businessName: varchar("business_name", { length: 180 }).notNull(),
    businessEmail: varchar("business_email", { length: 180 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull(),
    description: text("description"),
    logo: text("logo"),
    banner: text("banner"),
    address: text("address"),
    status: vendorStatusEnum("status").notNull().default("PENDING"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("vendors_user_id_ux").on(t.userId),
    uniqueIndex("vendors_business_email_ux").on(t.businessEmail),
    index("vendors_status_idx").on(t.status),
  ],
);

export const vendorRelations = relations(vendors, ({ one, many }) => ({
  user: one(users, {
    fields: [vendors.userId],
    references: [users.id],
  }),
  products: many(products),
}));

export type Vendor = InferSelectModel<typeof vendors>;
export type NewVendor = InferInsertModel<typeof vendors>;
