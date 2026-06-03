import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    await mongoose.connect(`${process.env.MONGODB_URL}/Vibez`);
  } catch (err) {
    console.log(err.message);
  }
};

export default connectDB;
