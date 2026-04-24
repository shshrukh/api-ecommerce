import { UserRole } from "../../constants/user.constants";
import mongoose, { Document } from "mongoose";
import {z} from "zod";
import { registerUserSchema } from "./user.validater";


export interface IAvatar {
    url: string,
    public_id: string
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

export interface IUserMethods {
    comparePassword(password: string): Promise<boolean>;
}
export interface RegisterUser {
    name: string,
    email: string,
    password: string, 
    address: IAddress,
    contactNumber: string
}



export interface IUserDocument extends IUser, IUserMethods, Document {};


export interface IRefreshToken {
    userId: mongoose.Types.ObjectId;
    tokenHash: string;
    expiresAt: Date;
    createdAt: Date;
    deviceInfo?: string;
    ipAddress?: string 
}

export type RegUser = z.infer<typeof registerUserSchema>;