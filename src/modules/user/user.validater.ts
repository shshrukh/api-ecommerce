import * as z from "zod";



const addressSchema = z.object({
    city: z.string().min(3, "City must have have at least characters").regex(/^[A-Z a-z]+$/, { message: "Spacial cherecter are not allowed" }),
    country: z.string().min(3, "Country must have at least three characters").regex(/^[A-Z a-z]+$/, { message: "Spacial cherecter are not allowed" }),
    zip: z.number().int().min(10000, "Must be 5 digits").max(99999, "Must be 5 digits")
})


export const registerUserSchema = z.object({
    name: z.string().regex(/^[A-Z a-z]+$/, { message: "Spacial cherecter are not allowed" }),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password have at least 6 characters"),
    contactNumber: z.string().regex(/^\+923\d{9}$/, { message: "Invalid contact number format. Example: +923XXXXXXXXX" }),
    address: addressSchema
});



