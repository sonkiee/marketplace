import * as z from "zod";

export const registerVendorSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters").max(180),
  businessEmail: z.email("Invalid business email address").max(180),
  phone: z.string().min(5, "Phone number must be at least 5 characters").max(20),
  description: z.string().optional().nullable(),
  logo: z.string().url("Invalid logo URL").optional().nullable().or(z.literal("")),
  banner: z.string().url("Invalid banner URL").optional().nullable().or(z.literal("")),
  address: z.string().optional().nullable(),
});

export const updateVendorSchema = registerVendorSchema.partial();
