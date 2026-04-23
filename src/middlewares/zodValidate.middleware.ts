import { Request, Response, NextFunction } from "express";
import { SchemaType } from "../interfaces/zodValidation.types";
import { ZodError } from "zod";

export const validateSchema = (schemas: SchemaType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (schemas.body) {
                req.body = schemas.body.parse(req.body);
            }

            if (schemas.params) {
                req.params = schemas.params.parse({ ...req.params }) as typeof req.params;
            }

            if (schemas.query) {
                req.query = schemas.query.parse({ ...req.query }) as typeof req.query
            }

            return next(); 
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                const errors: Record<string, string> = {};

                error.issues.forEach((issue) => {
                    const path = issue.path.join(".");
                    errors[path] = issue.message;
                });

                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors,
                });
            }
            return next(error);
        }
    };
};