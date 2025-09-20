import mongoose from "mongoose";

function connectToDB() {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}


export default connectToDB;
