import mongoose from "mongoose";

export const connectMongoDB = async () => {
  if (mongoose.connection.readyState) {
    console.log("connected succesfully");
    return mongoose.connection.asPromise;
  }

  return await mongoose.connect(process.env.MONGODB_URI);
};
