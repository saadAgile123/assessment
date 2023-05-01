import * as mongoose from 'mongoose';

export async function createConnection() {
  const mongoURI = process.env.MONGO_URI ?? '';
  const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    const connection = await mongoose.connect(
      mongoURI,
      mongooseOptions as mongoose.ConnectOptions,
    );
    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
}
