const errorHandler = (error, request, response, next) => {
    response.status(error.code || 500).json(error.message);
};

export default errorHandler;