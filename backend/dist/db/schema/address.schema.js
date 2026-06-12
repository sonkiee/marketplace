"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addresses = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const enum_1 = require("./enum");
const user_schema_1 = require("./user.schema");
exports.addresses = (0, pg_core_1.pgTable)("addresses", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    userId: (0, pg_core_1.uuid)("user_id")
        .notNull()
        .references(() => user_schema_1.users.id, { onDelete: "cascade" }),
    label: (0, enum_1.addressLabelEnum)("label").notNull().default("primary"),
    // delivery contact
    firstName: (0, pg_core_1.varchar)("first_name", { length: 80 }).notNull(),
    lastName: (0, pg_core_1.varchar)("last_name", { length: 80 }).notNull(),
    phone: (0, pg_core_1.varchar)("phone", { length: 30 }).notNull(),
    address: (0, pg_core_1.text)("address_line").notNull(),
    city: (0, pg_core_1.varchar)("city", { length: 80 }).notNull(),
    state: (0, pg_core_1.varchar)("state", { length: 80 }).notNull(),
    zip: (0, pg_core_1.varchar)("zip", { length: 30 }),
    country: (0, pg_core_1.varchar)("country", { length: 80 }).notNull().default("Nigeria"),
    isDefault: (0, pg_core_1.boolean)("is_default").notNull().default(false),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
}, (t) => [(0, pg_core_1.index)("addresses_user_idx").on(t.userId)]);
