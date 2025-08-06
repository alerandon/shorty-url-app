import { Router } from 'express';
import appRoutes from './app';
import apiRoutes from './api';

const router = Router();

router.use('/', appRoutes);
router.use('/api', apiRoutes);

export default router;
