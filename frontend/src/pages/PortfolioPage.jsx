import { useState, useEffect } from 'react';
import { tradingAPI, marketAPI } from '../services/api';
import { getSocket } from '../services/socket';
import PortfolioView from '../components/PortfolioView';

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState(null);
  const [orders, setOrders] = useState([]);

  const loadPortfolio = async () => {
    try {
      const [portfolioRes, ordersRes] = await Promise.all([
        tradingAPI.getPortfolio(),
        tradingAPI.getOrders(20),
      ]);
      setPortfolio(portfolioRes.data);
      setOrders(ordersRes.data);
    } catch (err) {
      console.error('Failed to load portfolio:', err);
    }
  };

  useEffect(() => {
    loadPortfolio();
  }, []);

  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      const handleUpdate = () => loadPortfolio();
      socket.on('order_filled', handleUpdate);
      return () => socket.off('order_filled', handleUpdate);
    }
  }, []);

  return (
    <div className="portfolio-page">
      <h1>Portfolio</h1>
      {portfolio && <PortfolioView portfolio={portfolio} />}

      <div className="panel" style={{ marginTop: '24px' }}>
        <h2>Recent Orders</h2>
        {orders.length === 0 ? (
          <p className="empty-state">No orders yet. Start trading!</p>
        ) : (
          <div className="orders-table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Symbol</th>
                  <th>Type</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="order-time">{new Date(order.createdAt).toLocaleString()}</td>
                    <td className="order-symbol">{order.symbol}</td>
                    <td>
                      <span className={`order-type ${order.type}`}>{order.type.toUpperCase()}</span>
                    </td>
                    <td>{order.quantity}</td>
                    <td>${order.price.toFixed(2)}</td>
                    <td>${(order.price * order.quantity).toFixed(2)}</td>
                    <td>
                      <span className={`order-status ${order.status}`}>{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
