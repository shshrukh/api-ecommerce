import { UserRole } from "../constants/user.constants";
import { Document } from "mongoose";

export interface IAvatar {
    url: string,
    public_id: string
}

export interface IRefreshToken {
    token: string | null,
    createdAt: Date
}

export interface IAddress {
    city: string;
    country: string;
    zip: number;
}

export interface IUser {
    name: string,
    email: string,
    password: string,
    avatar?: IAvatar | null,
    contactNumber: string,
    isVerified: boolean,
    role: UserRole,
    refreshToken: IRefreshToken[],
    address: IAddress[],
    verificationToken?: string | null,
    verificationTokenExp?: Date | null
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
