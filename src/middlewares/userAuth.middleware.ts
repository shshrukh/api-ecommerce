import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";
import { CONSTANTS } from "../constants/env.constant";
import { UserRole } from "../constants/user.constants";
import { AuthRequest } from "../types/auth.types";


export const userAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthRequest
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError( 401, "Unauthorized" );
        };

        const token: string = authHeader.split(" ")[1];

        //verifing token 
        const decode = jwt.verify(token, CONSTANTS.ACCESS_SECRET) as {
            user_id: string;
            role: UserRole;
        };

        const { user_id, role } = decode;

        authReq.user = {
            user_id,
            role
        };

        next();

    } catch (error) {
        throw new ApiError(401, "invalid or expired token")
    }
}