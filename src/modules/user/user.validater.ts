// ================= REGISTER SCHEMA =================
import { z } from "zod";

export const registerSchema = {
    body: z.object({
        name: z
            .string()
            .min(2, "Name must be at least 2 characters")
            .max(50)
            .trim(),

        email: z
            .string()
            .email("Invalid email")
            .toLowerCase()
            .trim(),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[a-z]/, "Must contain at least one lowercase letter")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[0-9]/, "Must contain at least one number"),

        contactNumber: z
            .string()
            .min(10, "Contact number is too short")
            .max(15, "Contact number is too long"),

        address: z.object({
            city: z.string().min(1, "City is required"),
            country: z.string().min(1, "Country is required"),
            zip: z.number(),
        }),
    }),
};

// ✅ FIX: correct type inference
export type RegisterUserDto = z.infer<typeof registerSchema.body>;