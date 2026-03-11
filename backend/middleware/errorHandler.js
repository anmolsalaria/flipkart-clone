/**
 * Global Error Handling Middleware
 * --------------------------------
 * Catches all errors thrown in route handlers and sends
 * a consistent JSON error response. This centralizes error
 * handling so individual controllers don't need try/catch blocks
 * for response formatting.
 *
 * Usage: app.use(errorHandler) — must be registered AFTER all routes.
 */

const errorHandler = (err, _req, res, _next) => {
  console.error('🔴 Error:', err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
