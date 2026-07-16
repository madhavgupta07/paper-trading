const STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 178.50 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.20 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.90 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.25 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.40 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.30 },
  { symbol: 'META', name: 'Meta Platforms', price: 505.75 },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 195.60 },
  { symbol: 'V', name: 'Visa Inc.', price: 278.15 },
  { symbol: 'WMT', name: 'Walmart Inc.', price: 165.80 },
  { symbol: 'DIS', name: 'Walt Disney Co.', price: 112.45 },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 628.90 },
  { symbol: 'BA', name: 'Boeing Co.', price: 215.30 },
  { symbol: 'INTC', name: 'Intel Corp.', price: 43.25 },
  { symbol: 'AMD', name: 'AMD Inc.', price: 162.70 },
];

class MarketDataService {
  constructor() {
    this.prices = {};
    this.history = {};
    this.subscribers = new Set();
    this.interval = null;

    STOCKS.forEach((stock) => {
      this.prices[stock.symbol] = {
        ...stock,
        change: 0,
        changePercent: 0,
        high: stock.price,
        low: stock.price,
        volume: Math.floor(Math.random() * 1000000) + 100000,
      };
      this.history[stock.symbol] = [];
    });
  }

  getStocks() {
    return Object.values(this.prices);
  }

  getStock(symbol) {
    return this.prices[symbol.toUpperCase()] || null;
  }

  getHistory(symbol, limit = 50) {
    return (this.history[symbol.toUpperCase()] || []).slice(-limit);
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  broadcast(data) {
    this.subscribers.forEach((cb) => cb(data));
  }

  simulateMarket() {
    Object.keys(this.prices).forEach((symbol) => {
      const stock = this.prices[symbol];
      const volatility = 0.002 + Math.random() * 0.003;
      const trend = (Math.random() - 0.48) * volatility;
      const change = stock.price * trend;
      const newPrice = Math.max(1, stock.price + change);

      stock.change = parseFloat((newPrice - stock.price).toFixed(2));
      stock.changePercent = parseFloat(((newPrice - stock.price) / stock.price * 100).toFixed(2));
      stock.price = parseFloat(newPrice.toFixed(2));
      stock.high = Math.max(stock.high, stock.price);
      stock.low = Math.min(stock.low, stock.price);
      stock.volume += Math.floor(Math.random() * 5000);

      const point = {
        price: stock.price,
        time: Date.now(),
        volume: Math.floor(Math.random() * 5000),
      };
      this.history[symbol].push(point);
      if (this.history[symbol].length > 200) {
        this.history[symbol].shift();
      }
    });

    this.broadcast({
      type: 'price_update',
      data: this.getStocks(),
    });
  }

  start(intervalMs = 2000) {
    if (this.interval) return;
    this.interval = setInterval(() => this.simulateMarket(), intervalMs);
    console.log(`Market simulation started (interval: ${intervalMs}ms)`);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

module.exports = new MarketDataService();
