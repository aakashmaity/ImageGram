import * as z from 'zod'

export const zodSigninSchema = z.object({
    email: z.email(),
    password: z.string()
})