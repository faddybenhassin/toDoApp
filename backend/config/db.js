import mongoose from "mongoose"




async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/todos'), {
            serverSelectionTimeoutMS: 5000 // stops trying after 5 seconds
        };
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
}


export default connectDB;