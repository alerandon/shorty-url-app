import { Router } from 'express';
import {
  getUrls,
  viewUrl,
  createUrl,
  updateUrl,
  deleteUrl,
} from '../controllers/url.controller';

const router = Router();

router.get('/', getUrls);
router.get('/:shortCode', viewUrl);
router.post('/', createUrl);
router.put('/:shortCode', updateUrl);
router.delete('/:shortCode', deleteUrl);

export default router;
