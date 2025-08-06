import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';
import databaseConfig from './config/database';

dotenv.config();

const app = express();
const PORT = Number(process.env.API_PORT) || 3000;
await databaseConfig();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
