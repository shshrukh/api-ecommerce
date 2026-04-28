import { User } from "../../models/user.model";
import { RegisterUser} from "./user.interface";
import { reqUser } from "../../types/auth.types";
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

// get request user data;
const getCurrentUserService = async (payload: reqUser) => {

    const id = payload.user_id;

    const user = await User.findById(id).select("name email avatar contactNumber address");

    if (!user) {
        throw new ApiError(404, `User with id:${id} not found`);
    }

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        contactNumber: user.contactNumber,
        address: user.address
    }

}

export { registerUserService, getCurrentUserService }