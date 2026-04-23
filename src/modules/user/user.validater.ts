import * as z from "zod";



const addressSchema = z.array(
    z.object({
        city: z.string().min(3, "City is required"),
        country: z.string().min(3, "Country is required"),
        zip: z.number()
    })
);

export const registerUserSchema = z.object({
    name: z.string().regex(/^[A-Z a-z]+$/, { message: "Only letters are allowed" }),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password have at least 6 characters"),
    contactNumber: z.string().regex(/^\+923\d{9}$/, { message: "Invalid contact number format. Example: +923XXXXXXXXX" }),
    address: addressSchema
});



