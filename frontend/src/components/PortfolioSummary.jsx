export default function PortfolioSummary({ portfolio }) {
  return (
    <div className="portfolio-summary">
      <div className="summary-card">
        <span className="card-label">Portfolio Value</span>
        <span className="card-value">${portfolio.totalPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
      </div>
      <div className="summary-card">
        <span className="card-label">Invested</span>
        <span className="card-value">${portfolio.totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
      </div>
      <div className="summary-card">
        <span className="card-label">Market Value</span>
        <span className="card-value">${portfolio.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
      </div>
      <div className="summary-card">
        <span className="card-label">Total P/L</span>
        <span className={`card-value ${portfolio.totalProfit >= 0 ? 'profit' : 'loss'}`}>
          {portfolio.totalProfit >= 0 ? '+' : ''}${portfolio.totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
}
