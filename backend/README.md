# Coinbase Clone - Backend API

Express.js REST API for Coinbase Clone with JWT authentication and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- npm v7+
- MongoDB Atlas account

### Installation

1. **Clone and install**
```bash
npm install
```

2. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

3. **Seed database (optional)**
```bash
node seed.js
```

4. **Start development server**
```bash
npm run dev
```

Server runs on `http://localhost:5000`

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user, returns JWT
- `GET /api/auth/logout` - Logout user

### Profile (Protected)
- `GET /api/profile` - Get current user profile

### Cryptocurrencies (Public)
- `GET /api/crypto` - Get all cryptos (paginated)
- `GET /api/crypto/gainers` - Get top gainers
- `GET /api/crypto/new` - Get new listings
- `POST /api/crypto` - Add new crypto (requires auth)
- `GET /api/crypto/:id` - Get single crypto

## 🔐 Authentication

Uses JWT tokens stored in HTTP-only cookies. Token includes user ID and expires in 7 days.

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/       # Database config
│   ├── models/       # Mongoose schemas
│   ├── controllers/  # Route handlers
│   ├── routes/       # API routes
│   ├── middleware/   # Express middleware
│   ├── validators/   # Input validation schemas
│   └── utils/        # Helper functions
├── server.js         # Entry point
├── seed.js          # Database seeding
└── .env             # Environment variables
```

## 🛠️ Technology Stack

- **Express.js** - REST API framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Joi** - Input validation

## 🚢 Deployment

### Render.com

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set build command: `npm install`
5. Set start command: `node server.js`
6. Add environment variables
7. Deploy

## 📝 Environment Variables

```
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
JWT_EXPIRATION=7d
CORS_ORIGIN=http://localhost:5173
```

## 🧪 Testing

Test endpoints with Postman or similar tool:

1. Register: POST /api/auth/register
2. Login: POST /api/auth/login
3. Get Profile: GET /api/profile (with token)
4. Get Cryptos: GET /api/crypto

## 📚 Documentation

Full API documentation and examples available at `/api/health`
