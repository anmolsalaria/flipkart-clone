/**
 * Order Controller
 * ----------------
 * Handles order placement and retrieval.
 *
 * Order Placement Flow:
 *   1. Frontend sends shipping details → POST /api/orders
 *   2. Backend fetches user's cart items with JOIN on products
 *   3. Calculates total_amount (Σ price × quantity)
 *   4. Uses a TRANSACTION to ensure atomicity:
 *      a. INSERT into orders (header)
 *      b. INSERT into order_items (line items)
 *      c. DELETE all cart items for the user
 *   5. If any step fails, the entire transaction is ROLLED BACK
 *   6. Returns order ID + details for the confirmation page
 *
 * Transactions guarantee data consistency — the user never ends up
 * with a placed order but items still in their cart, or vice-versa.
 */

import pool from '../config/db.js';

const USER_ID = 1;

// POST /api/orders — place an order from current cart contents
export const placeOrder = async (req, res, next) => {
  const connection = await pool.getConnection();

  try {
    const { shipping_name, shipping_phone, shipping_address, shipping_city, shipping_pincode } = req.body;

    // Validate shipping details
    if (!shipping_name || !shipping_phone || !shipping_address || !shipping_city || !shipping_pincode) {
      return res.status(400).json({ success: false, message: 'All shipping fields are required' });
    }

    // Fetch cart items
    const [cartItems] = await connection.query(
      `SELECT c.product_id, c.quantity, p.price, p.name
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = ?`,
      [USER_ID]
    );

    if (cartItems.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // Calculate total
    const total_amount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Begin transaction — all or nothing
    await connection.beginTransaction();

    // Step 1: Create order header
    const [orderResult] = await connection.query(
      `INSERT INTO orders (user_id, total_amount, shipping_name, shipping_phone,
                           shipping_address, shipping_city, shipping_pincode)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [USER_ID, total_amount, shipping_name, shipping_phone, shipping_address, shipping_city, shipping_pincode]
    );

    const orderId = orderResult.insertId;

    // Step 2: Insert order line items
    const orderItemValues = cartItems.map((item) => [
      orderId,
      item.product_id,
      item.quantity,
      item.price,
    ]);

    await connection.query(
      'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?',
      [orderItemValues]
    );

    // Step 3: Clear the user's cart
    await connection.query('DELETE FROM cart WHERE user_id = ?', [USER_ID]);

    // Commit the transaction
    await connection.commit();

    res.status(201).json({
      success: true,
      data: {
        order_id: orderId,
        total_amount,
        items: cartItems,
        shipping: { shipping_name, shipping_phone, shipping_address, shipping_city, shipping_pincode },
      },
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};

// GET /api/orders/user — all orders for the default user
export const getUserOrders = async (_req, res, next) => {
  try {
    const [orders] = await pool.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [USER_ID]
    );
    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// GET /api/orders/:id — single order with its line items
export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [[order]] = await pool.query(
      'SELECT * FROM orders WHERE id = ? AND user_id = ?',
      [id, USER_ID]
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const [items] = await pool.query(
      `SELECT oi.*, p.name, p.image_url
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [id]
    );

    order.items = items;
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};
