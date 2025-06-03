import mongoose from "mongoose";

export const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1/recipeProjectDB';
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`Mongo Connect to ${MONGO_URI}`);
    } catch (error) {
        console.log('Mongo Error', error.message);
        process.exit();
    }
}