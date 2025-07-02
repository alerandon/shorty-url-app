import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { defineRelationships } from '../models/relationships';
import { initUserModel } from '../models/user.model';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'shorty-url-app',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    // Initialize models
    initUserModel(sequelize);

    // Define relationships between models
    defineRelationships();

    // Sync models with database
    sequelize.sync();
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
