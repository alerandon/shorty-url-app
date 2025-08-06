import { Router } from 'express';
import urlRoutes from './url.routes';

const router = Router();

router.use('/urls', urlRoutes);

export default router;
