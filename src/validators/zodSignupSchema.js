import * as z from "zod"

export const zodSighupSchema = z.object({
    username: z.string().min(5, { message: "Username must be at least 5 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" })
})                     