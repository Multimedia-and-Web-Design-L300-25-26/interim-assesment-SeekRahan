/**
 * Authentication Routes
 * Routes for user registration and login
 */
import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import { registerSchema, loginSchema, validate } from '../validators/authValidator.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', validate(registerSchema), register);

// POST /api/auth/login
router.post('/login', validate(loginSchema), login);

// GET /api/auth/logout
router.get('/logout', logout);

export default router;
