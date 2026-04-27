import * as z from "zod";


export const loginScheama = z.object({
    email: z.email(),
    password: z.string().min( 8, "string must have at least eight characters")
})