import { loginScheama } from "./auth.validater";
import {z} from "zod";
import { UserRole } from "../../constants/user.constants";


export interface LoginUser{
    email: string;
    password: string
}

export type LogUser = z.infer<typeof loginScheama>

export interface JwtPayload {
    user_id: string;
    role: UserRole;
    iat?: number;
    exp?: number;
}