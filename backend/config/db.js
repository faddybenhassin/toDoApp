import mongoose from "mongoose"
import { mongoURI } from "./key.js";




async function connectDB() {
    try {
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000 // stops trying after 5 seconds
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
}


export default connectDB;