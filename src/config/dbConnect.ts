import mongoose from "mongoose";
import { CONSTANTS } from "../constants/env.constant"


export const connectDB = async function () {
    try {
        const connectionInstance = await mongoose.connect(CONSTANTS.MONGOOBD_URL, {
            dbName: CONSTANTS.DB_NAME,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 8000,
            socketTimeoutMS: 45000,
        })

        console.log(`Mongo_DB is connected on : ${connectionInstance.connection.host} : ${connectionInstance.connection.port}`);
        mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected!'));
        mongoose.connection.on('reconnected', () => console.log('MongoDB reconnected!'));

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`❌ MongoDB Initial Connection Error: ${error.message}`);
        } else {
            console.error(`❌ An unexpected error occurred:`, error);
        }

        process.exit(1);
    }
}