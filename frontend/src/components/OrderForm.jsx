import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { tradingAPI } from '../services/api';

export default function OrderForm({ stock, onOrderPlaced }) {
  const { updateBalance } = useAuth();
  const [type, setType] = useState('buy');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setQuantity(1);
    setError('');
    setSuccess('');
  }, [stock?.symbol]);

  if (!stock) {
    return (
      <div className="order-form-empty">
        <p>Select a stock from the market table to start trading</p>
      </div>
    );
  }

  const total = stock.price * quantity;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await tradingAPI.placeOrder(stock.symbol, type, quantity);
      setSuccess(`${type === 'buy' ? 'Bought' : 'Sold'} ${quantity} ${stock.symbol} @ $${stock.price.toFixed(2)}`);
      updateBalance(res.data.balance);
      setQuantity(1);
      onOrderPlaced();
    } catch (err) {
      setError(err.response?.data?.error || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="order-stock-info">
        <span className="order-stock-symbol">{stock.symbol}</span>
        <span className="order-stock-price">${stock.price.toFixed(2)}</span>
      </div>

      <div className="type-toggle">
        <button
          type="button"
          className={`type-btn ${type === 'buy' ? 'active buy' : ''}`}
          onClick={() => setType('buy')}
        >
          BUY
        </button>
        <button
          type="button"
          className={`type-btn ${type === 'sell' ? 'active sell' : ''}`}
          onClick={() => setType('sell')}
        >
          SELL
        </button>
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
        />
      </div>

      <div className="order-summary">
        <div className="summary-row">
          <span>Market Price</span>
          <span>${stock.price.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Quantity</span>
          <span>{quantity}</span>
        </div>
        <div className="summary-row total">
          <span>Estimated Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <button
        type="submit"
        className={`btn btn-full ${type === 'buy' ? 'btn-buy' : 'btn-sell'}`}
        disabled={loading}
      >
        {loading ? 'Placing Order...' : `${type === 'buy' ? 'Buy' : 'Sell'} ${stock.symbol}`}
      </button>
    </form>
  );
}
