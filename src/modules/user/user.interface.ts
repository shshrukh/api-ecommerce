import { UserRole } from "../../constants/user.constants";
import mongoose, { Document } from "mongoose";
import { z } from "zod";
import { changePasswordSchema, registerUserSchema } from "./user.validater";


/* =========================
   USER TYPES
========================= */

export interface IAvatar {
    url: string;
    public_id: string;
}

export interface IAddress {
    city: string;
    country: string;
    zip: number;
}

export interface IUser {
    name: string;
    email: string;
    password?: string;
    avatar?: IAvatar | null;
    contactNumber: string;
    isVerified: boolean;
    role: UserRole;
    address: IAddress;
}

type UpdateUser = Partial<IUser> 
/* =========================
   USER DOCUMENT (MONGOOSE)
========================= */

export interface IUserMethods {
    comparePassword(password: string): Promise<boolean>;
}

export type IUserDocument = IUser & IUserMethods & Document;

/* =========================
   REGISTER USER TYPE
========================= */

export interface RegisterUser {
    name: string;
    email: string;
    password: string;
    address: IAddress;
    contactNumber: string;
}

/* =========================
   REFRESH TOKEN TYPE
========================= */

export interface IRefreshToken {
    userId: mongoose.Types.ObjectId;
    hashedToken: string;
    expiresAt: Date;
    deviceInfo?: string;
    ipAddress?: string;
}

/* IMPORTANT:
   ❌ removed createdAt
   because timestamps: true already provides it
*/

export type IRefreshTokenDocument = IRefreshToken & Document;

/* =========================
   ZOD TYPE
========================= */

export type RegUser = z.infer<typeof registerUserSchema>;


export interface ChangePasswordTO {
    user_id: string;
    oldPassword: string,
    newPassword: string
}

export type ChangePass = z.infer< typeof changePasswordSchema>