import { Response, Request, NextFunction, ErrorRequestHandler } from "express"
import { ApiError } from "../utils/ApiError";


export const ErrorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = err instanceof ApiError ? err.statusCode: 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};

