import { Router } from "express";
import { register } from "./user.controller";
import { schemaValidation } from "../../middlewares/zodValidation.middleware";
import { registerUserSchema } from "./user.validater";

const userRouter = Router();


userRouter.route("/register").post(schemaValidation(registerUserSchema),register);


export {userRouter}