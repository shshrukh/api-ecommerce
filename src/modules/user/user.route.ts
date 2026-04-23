import { Router } from "express";
import { register } from "./user.controller";
import { validateSchema } from "../../middlewares/zodValidate.middleware";
import { registerSchema } from "./user.validater";


const userRouter = Router();


userRouter.route("/checking").post( validateSchema(registerSchema), register);


export {userRouter}