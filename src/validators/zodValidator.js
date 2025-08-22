// Zod validator acts like a middleware, So It should be called inside routing layer

export const validate = (schema) => {
    return async (req, res, next) => {
        try {
            schema.parse(req.body);
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