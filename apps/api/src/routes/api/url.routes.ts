import { Router } from 'express';
import {
  getUrls,
  createUrl,
  updateUrl,
  deleteUrl,
} from '../../controllers/url.controller';

const router = Router({ mergeParams: true });

router.get('/', getUrls); // Get URLs by guest user
router.post('/', createUrl); // Create new URL
router.put('/:shortCode', updateUrl); // Update existing URL
router.delete('/:shortCode', deleteUrl); // Delete URL

export default router;
