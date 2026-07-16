import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function MiniChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="chart-empty">No price data available</div>;
  }

  const chartData = data.map((d) => ({
    time: new Date(d.time).toLocaleTimeString(),
    price: d.price,
  }));

  const firstPrice = chartData[0].price;
  const lastPrice = chartData[chartData.length - 1].price;
  const isUp = lastPrice >= firstPrice;

  return (
    <div className="mini-chart">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <XAxis dataKey="time" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
          <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10 }} width={60} />
          <Tooltip
            contentStyle={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: '4px' }}
            labelStyle={{ color: '#aaa' }}
            formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
          />
          <ReferenceLine y={firstPrice} stroke="#555" strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="price"
            stroke={isUp ? '#00c853' : '#ff1744'}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
