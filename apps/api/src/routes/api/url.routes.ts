import { Router } from 'express';
import {
  getUrls,
  createUrl,
  deleteUrl,
} from '../../controllers/url.controller';

const router = Router({ mergeParams: true });

router.get('/', getUrls);
router.post('/', createUrl);
router.delete('/:shortCode', deleteUrl);

export default router;
