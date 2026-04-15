import dotenv from "dotenv";
dotenv.config();


export const CONSTANTS = {
    MONGOOBD_URL: process.env.MONGOOBD_URL as string,
    DB_NAME: process.env.DB_NAME as string,
    
}