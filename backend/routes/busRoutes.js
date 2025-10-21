import express from 'express';
import { getBuses, addBus, updateBus, deleteBus } from '../controllers/busController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getBuses);
router.post('/', authMiddleware, adminMiddleware, addBus);
router.put('/:id', authMiddleware, adminMiddleware, updateBus);
router.delete('/:id', authMiddleware, adminMiddleware, deleteBus);

export default router;
