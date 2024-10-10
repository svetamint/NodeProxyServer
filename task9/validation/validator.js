export const validate = (schema) => {
    return (request, response, next) => {
        const dataToValidate = Object.keys(request.body).length > 0 ? request.body : request.query;
        const { error, value } = schema.validate(dataToValidate, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map(err => err.message);
            return response.status(400).json({ errors: errorMessages });
        }
        next();
    };
};