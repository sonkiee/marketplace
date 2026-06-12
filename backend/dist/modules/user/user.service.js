"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const http_error_1 = require("../../utils/http-error");
class UserService {
    constructor() {
        this.create = async (data) => {
            // const [user] = await db.insert(users).values(data).returning();
            const [user] = await db_1.db
                .insert(schema_1.users)
                .values({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email.toLowerCase().trim(),
                password: data.password,
            })
                .returning();
            return user;
        };
        this.list = async () => {
            return await db_1.db.query.users.findMany({
                orderBy: (u, { desc }) => [desc(u.createdAt)],
            });
        };
        this.promote = async (email) => {
            const user = await this.findByEmail(email);
            if (!user) {
                throw new http_error_1.HttpError("User not found", 404);
            }
            if (user.role === "admin") {
                throw new http_error_1.HttpError("User is already an admin", 409);
            }
            await db_1.db.update(schema_1.users).set({ role: "admin" }).where((0, drizzle_orm_1.eq)(schema_1.users.id, user.id));
            return { ...user, role: "admin" };
        };
        this.findById = async (id) => {
            return await db_1.db.query.users.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.users.id, id),
            });
        };
        this.findByEmail = async (email) => {
            return await db_1.db.query.users.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.users.email, email),
            });
        };
        this.update = async (id, data) => {
            const user = await this.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            const updatedUser = {
                ...user,
                ...data,
            };
            await db_1.db.update(schema_1.users).set(updatedUser).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
            return updatedUser;
        };
        this.updateProfile = async (id, data) => {
            const user = await this.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            const updatedUser = {
                ...user,
                ...data,
            };
            await db_1.db.update(schema_1.users).set(updatedUser).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
            return updatedUser;
        };
    }
}
exports.UserService = UserService;
