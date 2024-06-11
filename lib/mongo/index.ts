import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

const dbConnect = async () => {
  if (connection.isConnected) {
    console.log("Using existing connection");
    return;
  }
  const db = await mongoose.connect(process.env.MONGO_URI!);

  connection.isConnected = db.connections[0].readyState;
  console.log("New connection");
};

export default dbConnect;