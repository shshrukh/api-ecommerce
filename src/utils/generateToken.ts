import jwt, {SignOptions} from "jsonwebtoken";
import { JwtPayload } from "../modules/auth/auth.interface";
import { CONSTANTS } from "../constants/env.constant"
import { ApiError } from "./ApiError";


const signAccessToken = ( payload: JwtPayload ): string => {
    const accessSecret = CONSTANTS.ACCESS_SECRET;
    if(!accessSecret){
        throw new ApiError(500, "access secret is not define") // just check for access secret key;
    }
    const options: SignOptions = {
        expiresIn: "15m",
        issuer: "hunza-dry-fruites",
        audience: "users"
    }

    return jwt.sign(payload, accessSecret, options);

}
const signRefreshToken = (payload: JwtPayload): string=>{
    const refreshSecret = CONSTANTS.REFRESH_TOKEN;
    if(!refreshSecret){
        throw new ApiError(500, "refresh secret is not define"); // just chek the refresh secret key;
    }
    const options: SignOptions = {
        expiresIn: "7d",
        issuer: "hunza-dry-fruits",
        audience: "users"
    }
    return jwt.sign(payload, refreshSecret, options)
}



export {signAccessToken, signRefreshToken}