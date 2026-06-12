"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
// address.service.ts
const db_1 = require("../../db");
const address_schema_1 = require("../../db/schema/address.schema");
const drizzle_orm_1 = require("drizzle-orm");
class AddressService {
    constructor() {
        this.listByUser = async (userId) => {
            return db_1.db.query.addresses.findMany({
                where: (0, drizzle_orm_1.eq)(address_schema_1.addresses.userId, userId),
                orderBy: (a, { desc }) => [desc(a.createdAt)],
            });
        };
        this.createForUser = async (userId, input) => {
            // If setting this new address as default, unset others
            if (input.isDefault) {
                await db_1.db
                    .update(address_schema_1.addresses)
                    .set({ isDefault: false, updatedAt: new Date() })
                    .where((0, drizzle_orm_1.eq)(address_schema_1.addresses.userId, userId));
            }
            const [created] = await db_1.db
                .insert(address_schema_1.addresses)
                .values({
                userId,
                label: input.label ?? "primary",
                firstName: input.firstName,
                lastName: input.lastName,
                phone: input.phone,
                address: input.address,
                city: input.city,
                state: input.state,
                zip: input.zip,
                country: input.country ?? "Nigeria",
                isDefault: input.isDefault ?? false,
            })
                .returning();
            if (!created)
                throw new Error("Failed to create address");
            return created;
        };
        // Optional helper: set an existing address as default (nice endpoint later)
        this.setDefault = async (userId, addressId) => {
            await db_1.db
                .update(address_schema_1.addresses)
                .set({ isDefault: false, updatedAt: new Date() })
                .where((0, drizzle_orm_1.eq)(address_schema_1.addresses.userId, userId));
            await db_1.db
                .update(address_schema_1.addresses)
                .set({ isDefault: true, updatedAt: new Date() })
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(address_schema_1.addresses.userId, userId), (0, drizzle_orm_1.eq)(address_schema_1.addresses.id, addressId)));
        };
    }
}
exports.AddressService = AddressService;
