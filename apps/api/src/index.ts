import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import sequelize from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);
app.get('/', (req, res, next) => {
  res.send({ message: sequelize.config });
});

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
