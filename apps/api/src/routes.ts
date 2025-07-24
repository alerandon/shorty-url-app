import { Router } from 'express';
import urlRoutes from './routes/url.routes';

const router = Router();

router.use('/urls', urlRoutes);

export default router;
