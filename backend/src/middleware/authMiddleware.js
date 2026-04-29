/**
 * Authentication Middleware
 * Verifies JWT token from Authorization header or cookie
 */
import { verifyToken } from '../utils/jwtUtils.js';
import User from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // Get token from Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Get token from cookies
    else if (req.cookies?.authToken) {
      token = req.cookies.authToken;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please sign in first.',
      });
    }

    // Verify token
    const decoded = verifyToken(token);

    // Get user from database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found. Token may be invalid.',
      });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `Authentication failed: ${error.message}`,
    });
  }
};

/**
 * Optional authentication middleware
 * Doesn't fail if no token, but attaches user if valid token provided
 */
export const optionalAuthMiddleware = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.authToken) {
      token = req.cookies.authToken;
    }

    if (token) {
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.userId);
      if (user) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    // Silently continue without user if auth fails
    next();
  }
};
