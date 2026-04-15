import express from "express"
import { ErrorMiddleware } from "./middlewares/error.middleware";
import { userRouter } from "./modules/user/user.route";
export const app = express();



app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ limit: '20kb', extended: true }));

app.use("/api/v1/user" ,userRouter );



// implementing the global middleware
app.use(ErrorMiddleware);