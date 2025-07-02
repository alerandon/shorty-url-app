import { Router } from 'express';
import userRoutes from './routes/url.routes';

const router = Router();

router.use('/users', userRoutes);

export default router;
