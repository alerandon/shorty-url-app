import { Router } from 'express';
import {
  getUrls,
  visitUrl,
  createUrl,
  updateUrl,
  deleteUrl,
} from '../controllers/url.controller';

const router = Router();

// URLs management endpoints
router.get('/:guestId', getUrls); // Get URLs by guest user
router.post('/', createUrl); // Create new URL
router.put('/:shortCode', updateUrl); // Update existing URL
router.delete('/:shortCode', deleteUrl); // Delete URL

// Redirect endpoint
router.get('/visit/:shortCode', visitUrl); // Redirect to original URL

export default router;
