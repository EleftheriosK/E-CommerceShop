import mongoose from "mongoose";

export const connectMongoDB = async () =>
{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI as string);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(error: any)
    {
        console.log(`Error connecting MongoDB: ${error.message}`);
        process.exit(1);
    }
}