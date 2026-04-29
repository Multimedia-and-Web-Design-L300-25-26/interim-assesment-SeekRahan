/**
 * Cryptocurrency Routes
 * Routes for cryptocurrency data management
 */
import express from 'express';
import {
  getAllCrypto,
  getGainers,
  getNewListings,
  addCrypto,
  getCryptoById,
} from '../controllers/cryptoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { addCryptoSchema, validate } from '../validators/cryptoValidator.js';

const router = express.Router();

// GET /api/crypto - Get all cryptocurrencies (public)
router.get('/', getAllCrypto);

// GET /api/crypto/gainers - Get top gainers (public)
router.get('/gainers', getGainers);

// GET /api/crypto/new - Get new listings (public)
router.get('/new', getNewListings);

// POST /api/crypto - Add new cryptocurrency (protected)
router.post('/', authMiddleware, validate(addCryptoSchema), addCrypto);

// GET /api/crypto/:id - Get single cryptocurrency (public)
router.get('/:id', getCryptoById);

export default router;
