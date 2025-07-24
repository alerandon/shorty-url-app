import mongoose from 'mongoose';

const connectDB = async () => {
  const DB_USER = process.env.API_DB_USER || 'user';
  const DB_PASSWORD = process.env.API_DB_PASSWORD || 'password';
  const DB_HOST = process.env.API_DB_HOST || 'mongodb';
  const DB_PORT = process.env.API_DB_PORT || '27017';
  const DB_NAME = process.env.API_DB_NAME || 'shorty-url-app';

  const CONN_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

  try {
    const conn = await mongoose.connect(CONN_URI);
    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error de conexión a MongoDB: ${error}`);
  }
};

export default connectDB;
