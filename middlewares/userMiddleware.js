export const createUserValidate = (schema) => {
    return (req, res, next) => {

        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                success: false,
                errors: error.details.map(err => err.message)
            });
        }
        next();
    };
};

export const updateUserValidate = (schema) => {
    return (req, res, next) => {
        console.log(req.body);
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            console.log(error);
            return res.status(400).json({
                success: false,
                errors: error.details.map(err => err.message)
            });
        }
        next();
    };
};