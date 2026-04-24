import { User } from "../../models/user.model";
import { RegisterUser } from "./user.interface";
import { ApiError } from "../../utils/ApiError";

const registerUserService = async (payload: RegisterUser) => {
    const { name, email, password, address, contactNumber } = payload;
    const user = await User.findOne({ email });
    if (user) {
        throw new ApiError(409, "User allredy exists");
    };
    const createUser = await User.create({ name, email, password, contactNumber, address });
    const safeUser = createUser.toObject();
    delete safeUser.password;
    return safeUser

}


export { registerUserService }