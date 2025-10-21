import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { listMyNotifications, markAsRead, markAllAsRead } from '../controllers/notificationController.js';
import { subscribe, unsubscribe } from '../utils/sse.js';

const router = Router();

router.use(authMiddleware);

router.get('/', listMyNotifications);
router.post('/mark-all-read', markAllAsRead);
router.post('/:id/read', markAsRead);

// SSE stream for notifications
router.get('/stream', (req, res) => {
	const userId = String(req.user.userId);
	res.setHeader('Content-Type', 'text/event-stream');
	res.setHeader('Cache-Control', 'no-cache');
	res.setHeader('Connection', 'keep-alive');
	res.flushHeaders?.();
	res.write('retry: 10000\n\n');
	subscribe(userId, res);
	req.on('close', () => unsubscribe(userId, res));
});

export default router;
