module.exports = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace

    // Check if the error has a status code, otherwise set it to 500 (Internal Server Error)
    const statusCode = err.statusCode || 500;
    
    // Set the response status code and send the error message
    res.status(statusCode).json({
        message: err.message || "Internal Server Error"
    });
};

// errorMiddleware.js

