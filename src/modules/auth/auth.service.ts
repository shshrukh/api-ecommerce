import { User } from "../../models/user.model";
import { ApiError } from "../../utils/ApiError";
import { IUserDocument } from "../user/user.interface";
import { LoginUser as loginInterfase } from "./auth.interface";
import { signAccessToken, signRefreshToken } from "../../utils/generateToken";
import { Token } from "../../models/refreshToken";
import { hashToken as hashingToken } from "../../utils/hashToken";



//@login user servise
const loginUser = async (payload: loginInterfase) => {
    const { email, password } = payload
    const user: IUserDocument | null = await User.findOne({ email }).select("name role +password");
    if (!user || !(await user.comparePassword(password))) {
        throw new ApiError(401, "Invalid credintials");
    }

    const tokenPayloadOptions = {
        user_id: user._id.toString(),
        role: user.role
    }
    const accessToken = signAccessToken(tokenPayloadOptions);
    const refreshToken = signRefreshToken(tokenPayloadOptions);

    // import the hash token method and hash the token for security perpose;
    const hashedToken = hashingToken(refreshToken);


    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const token = await Token.create({
        userId: user._id,
        hashedToken,
        expiresAt,
    });


    return {
        user: {
            id: user._id,
            name: user.name,
            role: user.role
        },
        accessToken,
        refreshToken
    };

};


export { loginUser };