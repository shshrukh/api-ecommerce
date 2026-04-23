import { NextFunction, Request, Response } from "express";
import { ZodType, z} from "zod";

export const schemaValidation = <T>(schema: ZodType<T>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (result.success) {
            req.body = result.data; 
            return next();
        } else {
            const errMessage: Record<string, string> = {};
            result.error.issues.forEach((e) => {
                const key = e.path.join(".");
                errMessage[key] = e.message;
            });

            return res.status(400).json({
                success: false,
                message: "zod validation fail",
                data: errMessage,
            });
        }
    };
};