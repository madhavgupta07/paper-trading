const express = require('express');
const auth = require('../middleware/auth');
const marketData = require('../services/marketData');

const router = express.Router();

router.get('/stocks', (req, res) => {
  res.json(marketData.getStocks());
});

router.get('/stocks/:symbol', (req, res) => {
  const stock = marketData.getStock(req.params.symbol);
  if (!stock) return res.status(404).json({ error: 'Stock not found' });
  res.json(stock);
});

router.get('/stocks/:symbol/history', (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const history = marketData.getHistory(req.params.symbol, limit);
  res.json(history);
});

module.exports = router;
