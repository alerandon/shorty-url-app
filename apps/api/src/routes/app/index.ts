import { Router } from 'express';
import { visitUrl } from '../../controllers/app.controller';

const router = Router();

router.get('/:shortCode', visitUrl);

export default router;
