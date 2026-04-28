import { UserRole } from "../constants/user.constants";
import { Request } from "express";

export interface reqUser {
    user_id: string;
    role: UserRole;
}


export interface AuthRequest extends Request {
    user: reqUser;
}