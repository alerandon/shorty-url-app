import { Router } from 'express';
import urlRoutes from './url.routes';

const router = Router();

router.use('/guests/:guestId/urls', urlRoutes);

export default router;
