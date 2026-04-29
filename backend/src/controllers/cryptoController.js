/**
 * Cryptocurrency Controller
 * Handles CRUD operations for cryptocurrencies
 */
import Cryptocurrency from '../models/Cryptocurrency.js';

/**
 * GET /api/crypto
 * Fetch all cryptocurrencies with pagination
 */
export const getAllCrypto = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [cryptos, total] = await Promise.all([
      Cryptocurrency.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Cryptocurrency.countDocuments(),
    ]);

    res.json({
      success: true,
      data: cryptos,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/crypto/gainers
 * Fetch top gainers sorted by 24h change (highest first)
 */
export const getGainers = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const gainers = await Cryptocurrency.find()
      .sort({ change24h: -1 })
      .limit(limit);

    res.json({
      success: true,
      data: gainers,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/crypto/new
 * Fetch newly added cryptocurrencies sorted by creation date
 */
export const getNewListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const newCryptos = await Cryptocurrency.find()
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json({
      success: true,
      data: newCryptos,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/crypto
 * Add a new cryptocurrency (requires authentication)
 */
export const addCrypto = async (req, res, next) => {
  try {
    const { name, symbol, price, imageUrl, change24h, marketCap, volume24h } = req.validatedBody;

    // Check if cryptocurrency with this symbol already exists
    const existingCrypto = await Cryptocurrency.findOne({
      symbol: symbol.toUpperCase(),
    });

    if (existingCrypto) {
      return res.status(409).json({
        success: false,
        message: 'Cryptocurrency with this symbol already exists',
        errors: { symbol: `${symbol} is already in use` },
      });
    }

    // Create new cryptocurrency
    const crypto = new Cryptocurrency({
      name,
      symbol: symbol.toUpperCase(),
      price,
      imageUrl: imageUrl || null,
      change24h,
      marketCap: marketCap || null,
      volume24h: volume24h || null,
      isNew: true,
    });

    await crypto.save();

    res.status(201).json({
      success: true,
      message: 'Cryptocurrency added successfully',
      data: crypto,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/crypto/:id
 * Get single cryptocurrency by ID
 */
export const getCryptoById = async (req, res, next) => {
  try {
    const crypto = await Cryptocurrency.findById(req.params.id);

    if (!crypto) {
      return res.status(404).json({
        success: false,
        message: 'Cryptocurrency not found',
      });
    }

    res.json({
      success: true,
      data: crypto,
    });
  } catch (error) {
    next(error);
  }
};
