import { Router } from 'express';
import { getProducts, getProductById, getCategories } from '../controllers/productController.js';

const router = Router();

router.get('/categories', getCategories);  // Must be before /:id to avoid conflict
router.get('/', getProducts);
router.get('/:id', getProductById);

export default router;
