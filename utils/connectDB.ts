import mongoose from 'mongoose';

interface connect {
  isConnected?: any;
}

const connection: connect = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGO_URI as string);

  connection.isConnected = db.connections[0].readyState;
  console.log('✅ MongoDB is connected.');
}

export default dbConnect;
