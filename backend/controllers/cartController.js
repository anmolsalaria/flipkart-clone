/**
 * Cart Controller
 * ---------------
 * Manages the shopping cart for user_id = 1 (no auth).
 *
 * Cart Flow:
 *   1. User clicks "Add to Cart" → POST /api/cart { product_id, quantity }
 *   2. If product already exists in cart, quantity is INCREMENTED (INSERT … ON DUPLICATE KEY UPDATE)
 *   3. User can update quantity (PUT) or remove item (DELETE)
 *   4. Frontend CartContext re-fetches cart after every mutation for real-time UI sync
 *
 * The JOIN with products table enriches cart items with product details
 * (name, image, price) so the frontend doesn't need separate calls.
 */

import pool from '../config/db.js';

const USER_ID = 1; // Default user — no authentication

// GET /api/cart — fetch all cart items with product details
export const getCart = async (_req, res, next) => {
  try {
    const [items] = await pool.query(
      `SELECT c.id, c.product_id, c.quantity,
              p.name, p.price, p.original_price, p.discount_percent,
              p.image_url, p.stock
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = ?`,
      [USER_ID]
    );
    res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

// POST /api/cart — add product to cart (or increment qty if exists)
export const addToCart = async (req, res, next) => {
  try {
    const { product_id, quantity = 1 } = req.body;

    if (!product_id) {
      return res.status(400).json({ success: false, message: 'product_id is required' });
    }

    // Verify product exists and is in stock
    const [[product]] = await pool.query('SELECT id, stock FROM products WHERE id = ?', [product_id]);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    if (product.stock < 1) {
      return res.status(400).json({ success: false, message: 'Product out of stock' });
    }

    // INSERT or UPDATE if the same product is already in the user's cart
    await pool.query(
      `INSERT INTO cart (user_id, product_id, quantity)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
      [USER_ID, product_id, quantity]
    );

    // Return the updated cart
    const [items] = await pool.query(
      `SELECT c.id, c.product_id, c.quantity,
              p.name, p.price, p.original_price, p.discount_percent,
              p.image_url, p.stock
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = ?`,
      [USER_ID]
    );

    res.status(201).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

// PUT /api/cart/:id — update cart item quantity
export const updateCartItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ success: false, message: 'Quantity must be at least 1' });
    }

    const [result] = await pool.query(
      'UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?',
      [quantity, id, USER_ID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    // Return updated cart
    const [items] = await pool.query(
      `SELECT c.id, c.product_id, c.quantity,
              p.name, p.price, p.original_price, p.discount_percent,
              p.image_url, p.stock
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = ?`,
      [USER_ID]
    );

    res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/cart/:id — remove a single item from cart
export const removeFromCart = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      'DELETE FROM cart WHERE id = ? AND user_id = ?',
      [id, USER_ID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    const [items] = await pool.query(
      `SELECT c.id, c.product_id, c.quantity,
              p.name, p.price, p.original_price, p.discount_percent,
              p.image_url, p.stock
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = ?`,
      [USER_ID]
    );

    res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};
