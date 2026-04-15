import { Router } from "express";
import { register } from "./user.controller";


const userRouter = Router();


userRouter.route("/checking").post(register);


export {userRouter}