export const createCategoryValidate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body.category, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                success: false,
                errors: error.details.map(err => err.message)
            });
        }
        next();
    };
};

export const updateCategoryValidate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body.category, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                success: false,
                errors: error.details.map(err => err.message)
            });
        }
        next();
    };
};