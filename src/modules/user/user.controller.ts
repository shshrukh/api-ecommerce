import { RegUser } from "./user.interface";
import { AsyncHandler } from "../../utils/asyncHandler";
import { registerUserService, getCurrentUserService } from "./user.service";
import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../../types/auth.types"; 

const register = AsyncHandler(async (req: Request<{}, {}, RegUser>, res: Response) => {

    const payload: RegUser = req.body;

    const data = await registerUserService(payload);

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data
    })
});

const currentUser = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const payload = (req as AuthRequest).user;

    const data = await getCurrentUserService( payload! );

    return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data
    });

});

export { register, currentUser }