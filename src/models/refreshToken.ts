import  {Schema, model} from "mongoose";
import { IRefreshTokenDocument } from "../modules/user/user.interface";



const refreshSchema = new Schema<IRefreshTokenDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    hashedToken: {
        type: String,
        required: true,
        select: false
    },
    expiresAt: {
        type: Date,
        required: true
    },
    deviceInfo: {
        type: String
    },
    ipAddress: {
        type: String
    }
}, { timestamps: true });


refreshSchema.index({ userId: 1 ,hashedToken: 1 });
refreshSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Token = model<IRefreshTokenDocument>("Token", refreshSchema);
