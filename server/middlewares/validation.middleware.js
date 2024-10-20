const validateAuthRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        next();
    };
};

const validateTaskRequest = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        next();
    };
};

export { validateAuthRequest, validateTaskRequest };
