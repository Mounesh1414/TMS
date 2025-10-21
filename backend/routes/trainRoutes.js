import express from 'express';
import { getTrains, addTrain, updateTrain, deleteTrain } from '../controllers/trainController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getTrains);
router.post('/', authMiddleware, adminMiddleware, addTrain);
router.put('/:id', authMiddleware, adminMiddleware, updateTrain);
router.delete('/:id', authMiddleware, adminMiddleware, deleteTrain);

export default router;
