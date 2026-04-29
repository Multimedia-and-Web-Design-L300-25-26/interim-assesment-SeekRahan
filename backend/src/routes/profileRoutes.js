/**
 * Profile Routes
 * Routes for user profile operations
 */
import express from 'express';
import { getProfile } from '../controllers/profileController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/profile - Get current user profile (protected)
router.get('/', authMiddleware, getProfile);

export default router;
