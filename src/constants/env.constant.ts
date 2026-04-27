import dotenv from "dotenv";
dotenv.config();


export const CONSTANTS = {
    MONGOOBD_URL: process.env.MONGOOBD_URL as string,
    DB_NAME: process.env.DB_NAME as string,
    ACCESS_SECRET: process.env.ACCESS_SECRET as string,
    JWT_ACCESS_EXP_IN: process.env.JWT_ACCESS_EXP_IN as string,
    REFRESH_TOKEN: process.env.REFRESH_SECRET as string
} 