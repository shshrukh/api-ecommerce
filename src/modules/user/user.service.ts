import { User } from "../../models/user.model";
import { RegisterUser } from "../../interfaces/user.interface";
import { ApiError } from "../../utils/ApiError";

const registerUserService = async (payload: RegisterUser)=>{
    const { name, email, contactNumber, password, address, } = payload;
    const existingUser = await User.findOne({email});

    if(existingUser){
        throw new ApiError(400, "user all ready exist with this email");
    }

    const user = await User.create({name, email, contactNumber, password, address: [address]});
    return {
        id: user._id,
        name: user.name,
        email: user.email
    }
}


export {registerUserService}