import { Router } from 'express';
import { listPublicAnnouncements, seedSampleAnnouncements } from '../controllers/announcementController.js';

const router = Router();

router.get('/announcements', listPublicAnnouncements);
// Optional: seed in development
router.post('/announcements/seed', seedSampleAnnouncements);

export default router;
