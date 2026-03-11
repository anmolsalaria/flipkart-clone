/**
 * Product Controller
 * ------------------
 * Handles all product-related business logic.
 *
 * Key patterns:
 *   - Parameterized queries (?) to prevent SQL injection
 *   - Pagination via LIMIT/OFFSET for large catalogs
 *   - Search uses SQL LIKE for partial name matching
 *   - Category filter is case-insensitive
 */

import pool from '../config/db.js';

// GET /api/products — list with optional search, category, pagination
export const getProducts = async (req, res, next) => {
  try {
    const { search, category, page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    // Optional: search by product name (LIKE %keyword%)
    if (search) {
      query += ' AND name LIKE ?';
      params.push(`%${search}%`);
    }

    // Optional: filter by category
    if (category) {
      query += ' AND LOWER(category) = LOWER(?)';
      params.push(category);
    }

    // Get total count for pagination metadata
    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) AS total');
    const [[{ total }]] = await pool.query(countQuery, params);

    // Apply pagination
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));

    const [products] = await pool.query(query, params);

    res.json({
      success: true,
      data: products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/categories — all distinct categories
export const getCategories = async (_req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT DISTINCT category FROM products ORDER BY category');
    res.json({ success: true, data: rows.map((r) => r.category) });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:id — single product + its carousel images
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [[product]] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Fetch associated carousel images
    const [images] = await pool.query('SELECT image_url FROM product_images WHERE product_id = ?', [id]);
    product.images = images.map((img) => img.image_url);

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};
