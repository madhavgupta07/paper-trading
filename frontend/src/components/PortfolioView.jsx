export default function PortfolioView({ portfolio }) {
  return (
    <div>
      <div className="portfolio-summary">
        <div className="summary-card">
          <span className="card-label">Total Portfolio</span>
          <span className="card-value large">${portfolio.totalPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="summary-card">
          <span className="card-label">Cash Balance</span>
          <span className="card-value">${portfolio.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="summary-card">
          <span className="card-label">Total P/L</span>
          <span className={`card-value ${portfolio.totalProfit >= 0 ? 'profit' : 'loss'}`}>
            {portfolio.totalProfit >= 0 ? '+' : ''}${portfolio.totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="panel" style={{ marginTop: '24px' }}>
        <h2>Holdings</h2>
        {portfolio.holdings.length === 0 ? (
          <p className="empty-state">No holdings yet. Start trading!</p>
        ) : (
          <div className="holdings-table-wrapper">
            <table className="holdings-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Avg Price</th>
                  <th>Current</th>
                  <th>Market Value</th>
                  <th>P/L</th>
                  <th>P/L %</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.holdings.map((h) => (
                  <tr key={h.symbol}>
                    <td className="stock-symbol">{h.symbol}</td>
                    <td>{h.name}</td>
                    <td>{h.quantity}</td>
                    <td>${h.avgBuyPrice.toFixed(2)}</td>
                    <td>${h.currentPrice.toFixed(2)}</td>
                    <td>${h.marketValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className={h.profit >= 0 ? 'price-up' : 'price-down'}>
                      {h.profit >= 0 ? '+' : ''}{h.profit.toFixed(2)}
                    </td>
                    <td className={h.profitPercent >= 0 ? 'price-up' : 'price-down'}>
                      {h.profitPercent >= 0 ? '+' : ''}{h.profitPercent.toFixed(2)}%
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
