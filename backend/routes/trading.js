const express = require('express');
const auth = require('../middleware/auth');
const tradingService = require('../services/trading');
const marketData = require('../services/marketData');

const router = express.Router();

router.post('/orders', auth, async (req, res) => {
  try {
    const { symbol, type, quantity } = req.body;
    const stock = marketData.getStock(symbol);
    if (!stock) return res.status(400).json({ error: 'Invalid symbol' });

    const result = await tradingService.placeOrder(
      req.user._id, symbol, type, parseInt(quantity), stock.price
    );

    req.app.get('io').to(`user_${req.user._id}`).emit('order_filled', {
      order: result.order,
      balance: result.balance,
    });

    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/portfolio', auth, async (req, res) => {
  try {
    const portfolio = await tradingService.getPortfolio(req.user._id);
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/orders', auth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const orders = await tradingService.getOrderHistory(req.user._id, limit);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
