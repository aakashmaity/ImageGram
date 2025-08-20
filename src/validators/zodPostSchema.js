import * as z from "zod"

export const zodPostSchema = z.object({
    caption: z.string({ error: (iss) => iss.input === undefined ? "Caption is required" : "Too small"}).min(1),
});


