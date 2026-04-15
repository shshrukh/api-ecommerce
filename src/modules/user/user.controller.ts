import { RegisterUser } from "../../interfaces/user.interface";
import { AsyncHandler } from "../../utils/asyncHandler";
import { registerUserService } from "./user.service";

const register = AsyncHandler(async (req, res)=>{
    const data: RegisterUser = req.body;
    const user= await registerUserService(data);
    res.status(201).json({
        success:true,
        message:"User registered successfully",
        data:user  
    })
});



export {register}