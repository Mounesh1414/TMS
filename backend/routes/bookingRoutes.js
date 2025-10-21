import express from 'express';
import { createBooking, getMyBookings, cancelBooking, getAllBookings, payForBooking } from '../controllers/bookingController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createBooking);
router.get('/my', authMiddleware, getMyBookings);
router.post('/:id/cancel', authMiddleware, cancelBooking);
router.post('/:id/pay', authMiddleware, payForBooking);
router.get('/all', authMiddleware, adminMiddleware, getAllBookings);

export default router;
