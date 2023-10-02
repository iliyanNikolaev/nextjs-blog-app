import mongoose from "mongoose";

const connectToDB = async () => {

    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URL);
    } catch (err) {
        throw new Error('DB Connection failed!');
    }
}

export default connectToDB;