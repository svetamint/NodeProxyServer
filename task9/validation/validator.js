import Exception from '../exception/Exception.js'
import { StatusCodes } from 'http-status-codes';

export const validate = (schema) => {
    return (request, response, next) => {
        const dataToValidate = Object.keys(request.body).length > 0 ? request.body : request.query;
        const { error, value } = schema.validate(dataToValidate, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map(err => err.message);
            throw new Exception(StatusCodes.BAD_REQUEST, errorMessages);
        }
        request.validatedData = value;
        next();
    };
};