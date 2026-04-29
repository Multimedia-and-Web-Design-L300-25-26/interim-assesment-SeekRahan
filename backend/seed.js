/**
 * Seed Database
 * Populates the database with initial cryptocurrency data
 * Run: node seed.js
 */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Cryptocurrency from './src/models/Cryptocurrency.js';

dotenv.config();

const seedData = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 68234.50,
    change24h: 4.23,
    marketCap: 1200000000000,
    volume24h: 34000000000,
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3845.12,
    change24h: 1.56,
    marketCap: 450000000000,
    volume24h: 15000000000,
  },
  {
    name: 'Tether',
    symbol: 'USDT',
    price: 1.0,
    change24h: 0.01,
    marketCap: 110000000000,
    volume24h: 45000000000,
  },
  {
    name: 'BNB',
    symbol: 'BNB',
    price: 598.45,
    change24h: -0.56,
    marketCap: 92000000000,
    volume24h: 1200000000,
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 145.67,
    change24h: 8.45,
    marketCap: 65000000000,
    volume24h: 3500000000,
  },
  {
    name: 'USDC',
    symbol: 'USDC',
    price: 1.0,
    change24h: 0.0,
    marketCap: 32000000000,
    volume24h: 2100000000,
  },
  {
    name: 'XRP',
    symbol: 'XRP',
    price: 0.62,
    change24h: -1.23,
    marketCap: 34000000000,
    volume24h: 1100000000,
  },
  {
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.16,
    change24h: 12.34,
    marketCap: 23000000000,
    volume24h: 2800000000,
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.45,
    change24h: -0.89,
    marketCap: 16000000000,
    volume24h: 450000000,
  },
  {
    name: 'Avalanche',
    symbol: 'AVAX',
    price: 35.67,
    change24h: 2.34,
    marketCap: 13000000000,
    volume24h: 340000000,
  },
];

const seed = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ Connected to MongoDB');

    // Clear existing cryptocurrencies
    await Cryptocurrency.deleteMany({});
    console.log('✓ Cleared existing cryptocurrencies');

    // Insert seed data
    const result = await Cryptocurrency.insertMany(seedData);
    console.log(`✓ Seeded ${result.length} cryptocurrencies`);

    // Display seeded data
    console.log('\nSeeded Cryptocurrencies:');
    result.forEach((crypto) => {
      console.log(`  - ${crypto.name} (${crypto.symbol}): $${crypto.price} (${crypto.change24h}%)`);
    });

    console.log('\n✓ Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('✗ Seed failed:', error.message);
    process.exit(1);
  }
};

seed();
