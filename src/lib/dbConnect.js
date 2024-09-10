import mongoose from "mongoose";

const connection = {};

const dbConnect = async () => {
  if (connection?.isConnected) {
    console.log("Already Connected to Database");
    return;
  }
  try {
    if (!process.env.MONGODB_URI) {
      console.log("Database uri not found");
      process.exit(1);
    }
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "sync",
    });
    connection.isConnected = db.connections[0].readyState;
    console.log("Successfully Connected to Database");
  } catch (error) {
    console.log("Error while Connecting to Database", { error });
    process.exit(1);
  }
};
export default dbConnect