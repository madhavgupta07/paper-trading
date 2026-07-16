const User = require('../models/User');
const Order = require('../models/Order');
const Holding = require('../models/Holding');
const marketData = require('./marketData');

class TradingService {
  async placeOrder(userId, symbol, type, quantity, price) {
    const stock = marketData.getStock(symbol);
    if (!stock) throw new Error('Invalid symbol');
    if (quantity <= 0) throw new Error('Quantity must be positive');

    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    if (type === 'buy') {
      const totalCost = price * quantity;
      if (user.balance < totalCost) {
        throw new Error(`Insufficient balance. Required: $${totalCost.toFixed(2)}, Available: $${user.balance.toFixed(2)}`);
      }
      user.balance -= totalCost;
      await user.save();

      const holding = await Holding.findOne({ userId, symbol });
      if (holding) {
        const totalQty = holding.quantity + quantity;
        holding.avgBuyPrice = ((holding.avgBuyPrice * holding.quantity) + (price * quantity)) / totalQty;
        holding.quantity = totalQty;
        await holding.save();
      } else {
        await Holding.create({ userId, symbol, quantity, avgBuyPrice: price });
      }

      const order = await Order.create({
        userId, symbol, type, quantity, price, status: 'filled',
      });

      return { order, balance: user.balance };
    }

    if (type === 'sell') {
      const holding = await Holding.findOne({ userId, symbol });
      if (!holding || holding.quantity < quantity) {
        throw new Error(`Insufficient shares. Available: ${holding ? holding.quantity : 0}`);
      }

      const proceeds = price * quantity;
      user.balance += proceeds;

      holding.quantity -= quantity;
      if (holding.quantity === 0) {
        await Holding.deleteOne({ _id: holding._id });
      } else {
        await holding.save();
      }

      await user.save();
      const order = await Order.create({
        userId, symbol, type, quantity, price, status: 'filled',
      });

      return { order, balance: user.balance };
    }

    throw new Error('Invalid order type');
  }

  async getPortfolio(userId) {
    const holdings = await Holding.find({ userId });
    const user = await User.findById(userId);

    let totalValue = 0;
    let totalInvested = 0;

    const portfolio = holdings.map((h) => {
      const stock = marketData.getStock(h.symbol);
      const currentPrice = stock ? stock.price : h.avgBuyPrice;
      const marketValue = currentPrice * h.quantity;
      const profit = marketValue - (h.avgBuyPrice * h.quantity);
      const profitPercent = h.avgBuyPrice > 0 ? (profit / (h.avgBuyPrice * h.quantity)) * 100 : 0;

      totalValue += marketValue;
      totalInvested += h.avgBuyPrice * h.quantity;

      return {
        symbol: h.symbol,
        name: stock ? stock.name : h.symbol,
        quantity: h.quantity,
        avgBuyPrice: parseFloat(h.avgBuyPrice.toFixed(2)),
        currentPrice: parseFloat(currentPrice.toFixed(2)),
        marketValue: parseFloat(marketValue.toFixed(2)),
        profit: parseFloat(profit.toFixed(2)),
        profitPercent: parseFloat(profitPercent.toFixed(2)),
      };
    });

    return {
      holdings: portfolio,
      balance: user.balance,
      totalInvested: parseFloat(totalInvested.toFixed(2)),
      totalValue: parseFloat(totalValue.toFixed(2)),
      totalPortfolioValue: parseFloat((user.balance + totalValue).toFixed(2)),
      totalProfit: parseFloat((totalValue - totalInvested).toFixed(2)),
    };
  }

  async getOrderHistory(userId, limit = 50) {
    return Order.find({ userId }).sort({ createdAt: -1 }).limit(limit);
  }
}

module.exports = new TradingService();
