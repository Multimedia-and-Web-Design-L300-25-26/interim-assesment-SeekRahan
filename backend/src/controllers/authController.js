/**
 * Authentication Controller
 * Handles user registration, login, and authentication
 */
import User from '../models/User.js';
import { generateToken } from '../utils/jwtUtils.js';

/**
 * POST /api/auth/register
 * Register a new user
 */
export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.validatedBody;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
        errors: { email: 'This email is already in use' },
      });
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/login
 * Login user and return JWT token
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.validatedBody;

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check password
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate token
    const token = generateToken(user._id.toString());

    // Set HTTP-only cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/logout
 * Logout user by clearing token cookie
 */
export const logout = (req, res) => {
  res.clearCookie('authToken');
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
};
