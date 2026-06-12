import { User, Vendor } from "../db/schema";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: User;
      vendor?: Vendor;
    }
  }
}
