// Zod validator acts like a middleware, So It should be called inside routing layer

export const validate = (schema) => {
    return async (req, res, next) => {
        try {
            const postObj = {
                caption: req.body?.caption,
            }
            schema.parse(postObj);
            next();
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: JSON.parse(error.message)
            })
        }
    }
}