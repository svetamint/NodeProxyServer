const errorHandler = (error, request, response, next) => {
    response.status(500).json(error.message);
};

export default errorHandler;