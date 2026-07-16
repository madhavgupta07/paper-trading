import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { marketAPI, tradingAPI } from '../services/api';
import { getSocket } from '../services/socket';
import StockTable from '../components/StockTable';
import PortfolioSummary from '../components/PortfolioSummary';
import OrderForm from '../components/OrderForm';
import MiniChart from '../components/MiniChart';

export default function Dashboard() {
  const { user } = useAuth();
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    marketAPI.getStocks().then((res) => setStocks(res.data));

    const socket = getSocket();
    if (socket) {
      const handlePriceUpdate = (data) => {
        if (data.type === 'price_update') {
          setStocks(data.data);
        }
      };
      socket.on('price_update', handlePriceUpdate);

      const handleOrderFilled = (data) => {
        setNotification({ type: 'success', message: `Order filled: ${data.order.quantity} ${data.order.symbol} @ $${data.order.price}` });
        setTimeout(() => setNotification(null), 4000);
        loadPortfolio();
      };
      socket.on('order_filled', handleOrderFilled);

      return () => {
        socket.off('price_update', handlePriceUpdate);
        socket.off('order_filled', handleOrderFilled);
      };
    }
  }, []);

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    try {
      const res = await tradingAPI.getPortfolio();
      setPortfolio(res.data);
    } catch (err) {
      console.error('Failed to load portfolio:', err);
    }
  };

  const handleSelectStock = async (stock) => {
    setSelectedStock(stock);
    try {
      const res = await marketAPI.getHistory(stock.symbol, 50);
      setPriceHistory(res.data);
    } catch (err) {
      console.error('Failed to load history:', err);
    }
  };

  const handleOrderPlaced = () => {
    loadPortfolio();
  };

  return (
    <div className="dashboard">
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="dashboard-header">
        <div>
          <h1>PaperTrader</h1>
          <p className="greeting">Welcome back, {user?.username}</p>
        </div>
        <div className="balance-display">
          <span className="balance-label">Available Cash</span>
          <span className="balance-value">${portfolio?.balance?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || user?.balance?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'}</span>
        </div>
      </div>

      {portfolio && <PortfolioSummary portfolio={portfolio} />}

      <div className="dashboard-grid">
        <div className="panel stock-panel">
          <h2>Live Market</h2>
          <StockTable stocks={stocks} onSelect={handleSelectStock} selected={selectedStock} />
        </div>

        <div className="side-panels">
          {selectedStock && (
            <div className="panel chart-panel">
              <h2>{selectedStock.symbol} - ${selectedStock.price.toFixed(2)}</h2>
              <MiniChart data={priceHistory} />
            </div>
          )}
          <div className="panel order-panel">
            <h2>Place Order</h2>
            <OrderForm
              stock={selectedStock || (stocks.length > 0 ? stocks[0] : null)}
              onOrderPlaced={handleOrderPlaced}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
