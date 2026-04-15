import { app } from "./app";
import { connectDB } from "./config/dbConnect";


connectDB()
    .then(()=>{
        app.listen(8000,()=>{
            console.log(`Server is running on port 8000`);
        })
    })