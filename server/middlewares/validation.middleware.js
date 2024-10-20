const validateAuthRequest = (schema) => {
    /*
        Function to validate the authentication routes
        Returns : error , if any
    */
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        next();
    };
};

const validateTaskRequest = (schema, property = 'body') => {
    /*
        Function to validate the task routes
        Returns : error if any
    */
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        next();
    };
};

export { validateAuthRequest, validateTaskRequest };
