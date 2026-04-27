import { AsyncHandler } from "../../utils/asyncHandler";
import { Request, Response } from "express";
import { LogUser } from "./auth.interface";
import { loginUser } from "./auth.service";


const login = AsyncHandler(async (req: Request<{}, {}, LogUser>, res: Response) => {
    
    const data: LogUser = req.body;
    const result = await loginUser(data);
    const { user, accessToken, refreshToken } = result;

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            user,
            accessToken
        }
    });

});



export { login };