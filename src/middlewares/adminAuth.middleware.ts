import { NextFunction, Request, Response } from "express";
import { AuthRequest, reqUser } from "../types/auth.types";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";
import { CONSTANTS } from "../constants/env.constant";
import { USER_ROLES, UserRole } from "../constants/user.constants";
import { User } from "../models/user.model";

export const adminAuthMiddleware = async ( req: Request, res: Response, next: NextFunction ) => { 
    
    const authReq = req as AuthRequest;

    try {

        const authHeader = req.headers.authorization;

        if( !authHeader || !authHeader.startsWith("Bearer ") ){
            throw new ApiError( 401, "Unauthorized" );
        };

        const token  = authHeader.split(" ")[1];

        //decode the token 
        const decode = jwt.verify( token, CONSTANTS.ACCESS_SECRET ) as {
            user_id: string;
            role: UserRole
        };

        const { user_id, role } = decode;

        const user = await User.findById( user_id ).select("role").lean();

        if( !user ){
            throw new ApiError( 404, "User not found");
        }
        if( user.role ! === USER_ROLES.ADMIN ){
            throw new ApiError ( 403, "Access denied: Admin only");
        };

        authReq.user = {
            user_id,
            role
        };

        next();

    } catch (error) {
        throw new ApiError( 401, "Invalid or expire token");
    }
};