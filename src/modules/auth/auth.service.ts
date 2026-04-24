import { User } from "../../models/user.model";
import { ApiError } from "../../utils/ApiError";
import { IUserDocument } from "../user/user.interface";
import { LoginUser as loginInterfase} from "./auth.interface";


const loginUser = async(payload: loginInterfase)=> {
    const{email, password} = payload
    const existingUser: IUserDocument| null= await User.findOne({email});
    if(!existingUser){
        throw new ApiError(400,"user not exists with this credentials");
    }   
    
    // comparing the password
    const hashpassword = existingUser.password;
    if(!hashpassword){
        throw new ApiError(400, "i know its my mistake for while let it" )
    }
    const isPasswordCorrect = await existingUser.comparePassword(password);

    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid credintials");
    }

    const data = "login successfully";
    

};


export {loginUser};