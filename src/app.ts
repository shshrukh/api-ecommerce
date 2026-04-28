import express from "express"
import { ErrorMiddleware } from "./middlewares/error.middleware";
import { userRouter } from "./modules/user/user.route";
import { authRouter } from "./modules/auth/auth.route";
import cookieParser from "cookie-parser";
export const app = express();



app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ limit: '20kb', extended: true }));
app.use(cookieParser());

app.use("/api/v1/user" ,userRouter );
app.use("/api/v1/auth", authRouter);

// implementing the global middleware
app.use(ErrorMiddleware);