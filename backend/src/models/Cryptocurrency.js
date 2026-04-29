/**
 * Cryptocurrency Model
 * Schema for cryptocurrency data
 */
import mongoose from 'mongoose';

const cryptocurrencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Cryptocurrency name is required'],
      trim: true,
    },
    symbol: {
      type: String,
      required: [true, 'Symbol is required'],
      unique: true,
      uppercase: true,
      trim: true,
      maxlength: [10, 'Symbol cannot exceed 10 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    imageUrl: {
      type: String,
      default: null,
    },
    change24h: {
      type: Number,
      required: [true, '24h change is required'],
      default: 0,
    },
    marketCap: {
      type: Number,
      default: null,
    },
    volume24h: {
      type: Number,
      default: null,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create indexes for efficient queries
cryptocurrencySchema.index({ symbol: 1 });
cryptocurrencySchema.index({ change24h: -1 });
cryptocurrencySchema.index({ createdAt: -1 });

export default mongoose.model('Cryptocurrency', cryptocurrencySchema);
