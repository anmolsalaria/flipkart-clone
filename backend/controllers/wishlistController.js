/**
 * Wishlist Controller
 * -------------------
 * Manages the user's wishlist (saved-for-later products).
 * UNIQUE constraint on (user_id, product_id) prevents duplicates.
 */

import pool from '../config/db.js';

const USER_ID = 1;

// GET /api/wishlist — all wishlist items with product details
export const getWishlist = async (_req, res, next) => {
  try {
    const [items] = await pool.query(
      `SELECT w.id, w.product_id,
              p.name, p.price, p.original_price, p.discount_percent,
              p.rating, p.image_url, p.stock, p.category
       FROM wishlist w
       JOIN products p ON w.product_id = p.id
       WHERE w.user_id = ?`,
      [USER_ID]
    );
    res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

// POST /api/wishlist — add product to wishlist
export const addToWishlist = async (req, res, next) => {
  try {
    const { product_id } = req.body;

    if (!product_id) {
      return res.status(400).json({ success: false, message: 'product_id is required' });
    }

    // INSERT IGNORE skips if the unique constraint (user_id, product_id) already exists
    await pool.query(
      'INSERT IGNORE INTO wishlist (user_id, product_id) VALUES (?, ?)',
      [USER_ID, product_id]
    );

    const [items] = await pool.query(
      `SELECT w.id, w.product_id,
              p.name, p.price, p.original_price, p.discount_percent,
              p.rating, p.image_url, p.stock, p.category
       FROM wishlist w
       JOIN products p ON w.product_id = p.id
       WHERE w.user_id = ?`,
      [USER_ID]
    );

    res.status(201).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/wishlist/:id — remove from wishlist
export const removeFromWishlist = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      'DELETE FROM wishlist WHERE id = ? AND user_id = ?',
      [id, USER_ID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Wishlist item not found' });
    }

    const [items] = await pool.query(
      `SELECT w.id, w.product_id,
              p.name, p.price, p.original_price, p.discount_percent,
              p.rating, p.image_url, p.stock, p.category
       FROM wishlist w
       JOIN products p ON w.product_id = p.id
       WHERE w.user_id = ?`,
      [USER_ID]
    );

    res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};
