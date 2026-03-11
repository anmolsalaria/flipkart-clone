/**
 * Database Configuration
 * ---------------------
 * Creates a MySQL connection pool using mysql2/promise.
 * A pool is used instead of a single connection for:
 *   - Better concurrency handling (multiple simultaneous queries)
 *   - Automatic connection management (release after use)
 *   - Resilience (reconnects on failure)
 *
 * The pool returns Promises, enabling async/await syntax throughout
 * the application for cleaner, more readable database operations.
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'flipkart_clone',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,      // Max simultaneous connections
  queueLimit: 0,            // Unlimited queued requests
  enableKeepAlive: true,    // Keep connections alive
  keepAliveInitialDelay: 0,
});

// Verify connection on startup
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL connected successfully');
    connection.release();
  } catch (err) {
    console.error('❌ MySQL connection failed:', err.message);
    process.exit(1);
  }
})();

export default pool;
