require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');
const marketData = require('./services/marketData');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.set('io', io);

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/market', require('./routes/market'));
app.use('/api/trading', require('./routes/trading'));

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  const token = socket.handshake.auth.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      socket.join(`user_${decoded.id}`);
    } catch (err) {
      console.log('Socket auth failed');
    }
  }

  socket.on('subscribe_stock', (symbol) => {
    socket.join(`stock_${symbol.toUpperCase()}`);
  });

  socket.on('unsubscribe_stock', (symbol) => {
    socket.leave(`stock_${symbol.toUpperCase()}`);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

marketData.subscribe((data) => {
  io.emit('price_update', data);
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  marketData.start(2000);
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
