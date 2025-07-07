import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/shorty-url-app';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connection established successfully.');
  })
  .catch((err: Error) => {
    console.error('Unable to connect to MongoDB:', err);
  });

export default mongoose;
