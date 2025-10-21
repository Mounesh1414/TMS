import express from 'express';
import { getFlights, addFlight, updateFlight, deleteFlight } from '../controllers/flightController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getFlights);
router.post('/', authMiddleware, adminMiddleware, addFlight);
router.put('/:id', authMiddleware, adminMiddleware, updateFlight);
router.delete('/:id', authMiddleware, adminMiddleware, deleteFlight);

export default router;
