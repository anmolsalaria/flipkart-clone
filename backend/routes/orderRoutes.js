import { Router } from 'express';
import { placeOrder, getUserOrders, getOrderById } from '../controllers/orderController.js';

const router = Router();

router.post('/', placeOrder);
router.get('/user', getUserOrders);   // Must be before /:id
router.get('/:id', getOrderById);

export default router;
