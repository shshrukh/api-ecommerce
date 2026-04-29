import { Router } from "express";
import { login } from "./auth.controller";
import { schemaValidation } from "../../middlewares/zodValidation.middleware";
import { loginScheama } from "./auth.validater";

const authRouter = Router();

authRouter.route( "/login" ).post( schemaValidation( loginScheama ), login);


export { authRouter};