import { Router } from "express";
import { changePassword, currentUser, register } from "./user.controller";
import { schemaValidation } from "../../middlewares/zodValidation.middleware";
import { changePasswordSchema, registerUserSchema } from "./user.validater";
import { userAuthMiddleware } from "../../middlewares/userAuth.middleware";


const userRouter = Router();


userRouter.route( "/register" ).post( schemaValidation( registerUserSchema ), register );
userRouter.route( "/current-user" ).get( userAuthMiddleware, currentUser );
userRouter.route( "/change-password" ).post( userAuthMiddleware, schemaValidation( changePasswordSchema ), changePassword )


export {userRouter}