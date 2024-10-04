import mongoose from "mongoose";

const mongoDBConnect = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Error while connecting to MongoDB", error);
        process.exit(1);
    }
    }

export default mongoDBConnect;