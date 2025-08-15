import { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, BarElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(LineElement, BarElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

function randWalk(len = 120, start = 68750) {
  const arr = [];
  let v = start;
  for (let i = 0; i < len; i++) {
    v += (Math.random() - 0.5) * 400;
    arr.push(Math.max(1000, v));
  }
  return arr;
}

function ema(values, period) {
  const k = 2 / (period + 1);
  const ema = [];
  let prev = values[0];
  for (let i = 0; i < values.length; i++) {
    const v = values[i] * k + prev * (1 - k);
    ema.push(v);
    prev = v;
  }
  return ema;
}

function Dashboard() {
  const [signals, setSignals] = useState([]);

  useEffect(() => {
    // Generate mock signals
    const sides = ['BUY', 'SELL'];
    const pairs = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'XRP/USDT', 'ADA/USDT'];
    const newSignals = Array.from({ length: 6 }, () => {
      const side = sides[Math.floor(Math.random() * 2)];
      const conf = Math.floor(Math.random() * 40 + 60);
      return {
        pair: pairs[Math.floor(Math.random() * pairs.length)],
        side,
        conf,
      };
    });
    setSignals(newSignals);
  }, []);

  const price = randWalk();
  const ema20 = ema(price, 20);
  const ema50 = ema(price, 50);

  const priceChartData = {
    labels: price.map((_, i) => i),
    datasets: [
      { label: 'Price', data: price, borderColor: '#64d2ff', pointRadius: 0, borderWidth: 2, fill: false },
      { label: 'EMA 20', data: ema20, borderColor: '#22c55e', pointRadius: 0, borderDash: [4, 4] },
      { label: 'EMA 50', data: ema50, borderColor: '#f59e0b', pointRadius: 0, borderDash: [6, 6] },
    ],
  };

  const priceChartOptions = {
    plugins: { legend: { labels: { color: getComputedStyle(document.body).color } } },
    scales: {
      x: { ticks: { display: false }, grid: { display: false } },
      y: { ticks: { color: getComputedStyle(document.body).color }, grid: { color: 'rgba(100,210,255,.08)' } },
    },
  };

  const pnl = Array.from({ length: 12 }, () => (Math.random() * 8 - 2).toFixed(2));
  const pnlChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly P&L %',
        data: pnl,
        backgroundColor: pnl.map((v) => (v >= 0 ? 'rgba(34,197,94,.7)' : 'rgba(239,68,68,.7)')),
      },
    ],
  };

  const pnlChartOptions = {
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: 'rgba(100,210,255,.08)' } },
    },
  };

  return (
    <section className="dashboard">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2>Price Chart</h2>
        <Line data={priceChartData} options={priceChartOptions} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <h2>P&L Chart</h2>
        <Bar data={pnlChartData} options={pnlChartOptions} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <h2>Signals</h2>
        <ul id="signalsList">
          {signals.map((signal, index) => (
            <li key={index}>
              <span>{signal.pair}</span>
              <span className={`badge ${signal.side === 'BUY' ? 'good' : 'bad'}`}>{signal.side}</span>
              <span className="badge">{signal.conf}%</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}

export default Dashboard;
