import { AsyncHandler } from "../../utils/asyncHandler";
import { Request, Response } from "express";
import { LogUser } from "./auth.interface";
import { loginUser } from "./auth.service";


const login = AsyncHandler(async(req: Request<{},{}, LogUser>, res: Response)=> {
    const data: LogUser= req.body;
    const result = await loginUser(data);
    res.status(201).json({
        success: true,
        message: result
    })

});



export{ login};