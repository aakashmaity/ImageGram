import * as z from "zod"

export const zodSighupSchema = z.object({
    username: z.string({ error: (iss) => iss.input === undefined ? "Username is required" : "Too small"}).min(5),
    email: z.email(),
    password: z.string().min(8)
})                     