import {  RegUser } from "./user.interface";
import { AsyncHandler } from "../../utils/asyncHandler";
import { registerUserService } from "./user.service";
import { Request, Response } from "express";

const register = AsyncHandler(async (req: Request<{}, {}, RegUser>, res: Response)=>{
    const data: RegUser = req.body;
    const user= await registerUserService(data);
    res.status(201).json({
        success:true,
        message:"User registered successfully",
        data: user
    })
});



export {register}