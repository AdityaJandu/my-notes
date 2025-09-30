import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MONGODB connected sucessfully!");
    } catch (error) {
        console.log(error);
        // Exit with error -> failure:
        process.exit(1);
    }
}