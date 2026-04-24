import { loginScheama } from "./auth.validater";
import {z} from "zod";


export interface LoginUser{
    email: string;
    password: string
}

export type LogUser = z.infer<typeof loginScheama>