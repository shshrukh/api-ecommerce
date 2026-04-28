import { Router } from "express";
import { currentUser, register } from "./user.controller";
import { schemaValidation } from "../../middlewares/zodValidation.middleware";
import { registerUserSchema } from "./user.validater";
import { authMiddleware } from "../../middlewares/auth.middleware";

const userRouter = Router();


userRouter.route("/register").post(schemaValidation(registerUserSchema),register);
userRouter.route("/current-user").get(authMiddleware, currentUser)


export {userRouter}