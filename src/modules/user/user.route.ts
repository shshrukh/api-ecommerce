import { Router } from "express";
import { register } from "./user.controller";
import { schemaValidation } from "../../middlewares/zodValidation.middleware";
import { registerUserSchema } from "./user.validater";

const userRouter = Router();


userRouter.route("/checking").post(schemaValidation(registerUserSchema),register);


export {userRouter}