import { User } from "../../models/user.model";
import { ApiError } from "../../utils/ApiError";
import { IUserDocument } from "../user/user.interface";
import { LoginUser as loginInterfase} from "./auth.interface";


const loginUser = async(payload: loginInterfase)=> {
    const{email, password} = payload
    const user: IUserDocument| null= await User.findOne({email}).select("name +password");
    if(!user){
        throw new ApiError(404,"user not found");
    }   
    
    const isPasswordCorrect = await user.comparePassword(password);

    if(!isPasswordCorrect){
        throw new ApiError(401, "Invalid credentials");
    }
    console.log(user);
    
    return `${user.name} login successfully`
    

};


export {loginUser};