export const createPostValidate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body.post, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                success: false,
                errors: error.details.map(err => err.message),
            });
        }
        next();
    }
}

export const updatePostValidate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body.post, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                success: false,
                errors: error.details.map(err => err.message),
            });
        }
        next();
    }
}