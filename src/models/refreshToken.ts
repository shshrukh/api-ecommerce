import mongoose, {Schema, model} from "mongoose";
import { IRefreshToken } from "../modules/user/user.interface";
import bcrypt from "bcrypt";


const refreshSchema = new Schema<IRefreshToken>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tokenHash: {
        type: String,
        required: true,
        select: false
    },
    expiresAt: {
        type: Date,
        required: true
    },
    deviceInfo: String,
    ipAddress: String
}, { timestamps: true });

refreshSchema.index({ userId: 1 });
refreshSchema.index({ tokenHash: 1 });
refreshSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Token = model<IRefreshToken>("Token", refreshSchema);
