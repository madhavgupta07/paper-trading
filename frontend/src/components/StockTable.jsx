export default function StockTable({ stocks, onSelect, selected }) {
  return (
    <div className="stock-table-wrapper">
      <table className="stock-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Price</th>
            <th>Change</th>
            <th>High</th>
            <th>Low</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr
              key={stock.symbol}
              className={`stock-row ${selected?.symbol === stock.symbol ? 'selected' : ''}`}
              onClick={() => onSelect(stock)}
            >
              <td className="stock-symbol">{stock.symbol}</td>
              <td className="stock-name">{stock.name}</td>
              <td className="stock-price">${stock.price.toFixed(2)}</td>
              <td className={stock.change >= 0 ? 'price-up' : 'price-down'}>
                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
              </td>
              <td className="stock-high">${stock.high.toFixed(2)}</td>
              <td className="stock-low">${stock.low.toFixed(2)}</td>
              <td className="stock-volume">{stock.volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
