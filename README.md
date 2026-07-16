# PaperTrader

A real-time paper trading application built with the MERN stack. Practice trading stocks with virtual money using live simulated market data.

## Features

- **Live Market Data** - Real-time stock price updates via WebSockets (15 stocks)
- **Paper Trading** - Buy and sell stocks at live market prices
- **Portfolio Management** - Track holdings, average buy price, market value, and P/L
- **Interactive Charts** - Price history charts powered by Recharts
- **Order History** - Full log of all trades with timestamps
- **Authentication** - JWT-based register/login with protected routes
- **Dark Theme UI** - Fully responsive design

## Tech Stack

| Layer    | Technology                                |
| -------- | ----------------------------------------- |
| Frontend | React 19, Vite, React Router, Recharts    |
| Backend  | Node.js, Express, Socket.IO               |
| Database | MongoDB with Mongoose                      |
| Auth     | JWT + bcrypt                               |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) running locally (default port 27017)

### Installation

```bash
git clone <repo-url>
cd trading-app
npm run install-all
```

### Run the App

```bash
npm run dev
```

This starts both servers concurrently:

| Service  | URL                     |
| -------- | ----------------------- |
| Frontend | http://localhost:5173   |
| Backend  | http://localhost:5000   |

### Available Scripts

| Command              | Description                            |
| -------------------- | -------------------------------------- |
| `npm run dev`        | Start frontend + backend in parallel   |
| `npm run install-all`| Install dependencies for both projects |
| `npm run server`     | Start backend only                     |
| `npm run client`     | Start frontend only                    |
| `npm run build`      | Build frontend for production          |
| `npm run start`      | Start backend in production mode       |

## Project Structure

```
trading-app/
├── package.json                  # Root scripts (run from here)
├── backend/
│   ├── server.js                 # Express + Socket.IO entry
│   ├── config/db.js              # MongoDB connection
│   ├── middleware/auth.js         # JWT verification
│   ├── models/
│   │   ├── User.js               # User (starts with $100K)
│   │   ├── Order.js              # Trade history
│   │   └── Holding.js            # Portfolio holdings
│   ├── routes/
│   │   ├── auth.js               # POST /register, /login, GET /me
│   │   ├── market.js             # GET /stocks, /stocks/:symbol
│   │   └── trading.js            # POST /orders, GET /portfolio, /orders
│   └── services/
│       ├── marketData.js         # Simulated price engine + WebSocket broadcast
│       └── trading.js            # Buy/sell logic + portfolio calculation
└── frontend/
    └── src/
        ├── App.jsx               # Routing + auth guards
        ├── context/AuthContext.jsx
        ├── services/
        │   ├── api.js            # Axios REST client
        │   └── socket.js         # Socket.IO client
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Dashboard.jsx     # Main trading view
        │   └── PortfolioPage.jsx # Holdings + order history
        └── components/
            ├── Navbar.jsx
            ├── StockTable.jsx
            ├── OrderForm.jsx
            ├── MiniChart.jsx
            ├── PortfolioSummary.jsx
            └── PortfolioView.jsx
```

## How Real-Time Updates Work

```
Backend timer (every 2s)
  └─> MarketDataService.simulateMarket()
        └─> Random walk price changes for 15 stocks
              └─> Socket.IO io.emit('price_update', stocks)
                    └─> All clients receive data
                          └─> React setState re-renders StockTable
```

No REST polling. A single persistent WebSocket connection pushes price updates from server to all clients.

## API Endpoints

### Auth

| Method | Endpoint         | Body                          | Auth |
| ------ | ---------------- | ----------------------------- | ---- |
| POST   | `/api/auth/register` | `{ username, email, password }` | No  |
| POST   | `/api/auth/login`    | `{ email, password }`            | No  |
| GET    | `/api/auth/me`       | -                                | Yes |

### Market

| Method | Endpoint                          | Auth |
| ------ | --------------------------------- | ---- |
| GET    | `/api/market/stocks`              | No   |
| GET    | `/api/market/stocks/:symbol`      | No   |
| GET    | `/api/market/stocks/:symbol/history` | No |

### Trading

| Method | Endpoint             | Body                        | Auth |
| ------ | -------------------- | --------------------------- | ---- |
| POST   | `/api/trading/orders`   | `{ symbol, type, quantity }` | Yes  |
| GET    | `/api/trading/portfolio` | -                           | Yes  |
| GET    | `/api/trading/orders`    | -                           | Yes  |
