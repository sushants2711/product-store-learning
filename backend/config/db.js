import mongoose from "mongoose";

export const connectDb = async () => {

    mongoose.connect(
        process.env.MONGO_URI
    ).then(() => console.log("Db connected"))
        .catch((error) => console.log("Error occured from Database", error))
}