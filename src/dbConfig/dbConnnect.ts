import mongoose from 'mongoose';

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export const dbConnect = async (): Promise<void> => {
  if (connection?.isConnected) {
    console.log('Already Connected to Database');
    return;
  }
  try {
    if (!process.env.MONGO_URI) {
      console.log('Database uri not found');
      process.exit(1);
    }
    const db = await mongoose.connect(process.env.MONGO_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log('Successfully Connected to Database');
  } catch (error) {
    console.log('Error while Connecting to Database', { error });
    process.exit(1);
  }
};
