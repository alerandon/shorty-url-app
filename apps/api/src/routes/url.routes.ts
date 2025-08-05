import { Router } from 'express';
import {
  getUrls,
  visitUrl,
  createUrl,
  updateUrl,
  deleteUrl,
} from '../controllers/url.controller';

const router = Router();

router.get('/', getUrls);
router.get('/:shortCode', visitUrl);
router.post('/', createUrl);
router.put('/:shortCode', updateUrl);
router.delete('/:shortCode', deleteUrl);

export default router;
