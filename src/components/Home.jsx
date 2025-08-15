import { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Filler } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(LineElement, PointElement, LinearScale, Filler);

function randWalk(len = 50, start = 68500) {
  const arr = [];
  let v = start;
  for (let i = 0; i < len; i++) {
    v += (Math.random() - 0.5) * 400;
    arr.push(Math.max(1000, v));
  }
  return arr;
}

function Home() {
  const canvasRef = useRef(null);
  const [signal, setSignal] = useState('');
  const [pnl, setPnl] = useState('');
  const [risk, setRisk] = useState('');

  useEffect(() => {
    // Randomize HUD
    const sigs = ['Strong Buy', 'Buy', 'Neutral', 'Sell', 'Strong Sell'];
    setSignal(sigs[Math.floor(Math.random() * sigs.length)]);
    const isPositive = Math.random() > 0.4;
    setPnl(`${isPositive ? '+' : '-'}${(Math.random() * 3 + 0.2).toFixed(1)}%`);
    setRisk(['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]);
  }, []);

  const values = randWalk();
  const chartData = {
    labels: values.map((_, i) => i),
    datasets: [
      {
        data: values,
        borderColor: getComputedStyle(document.body).getPropertyValue('--accent').trim(),
        borderWidth: 2,
        pointRadius: 0,
        fill: { target: 'origin', above: 'rgba(100,210,255,.12)' },
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  return (
    <section className="home">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1>AI Trading Genie</h1>
        <canvas id="heroChart" ref={canvasRef}></canvas>
        <Line data={chartData} options={chartOptions} />
        <p id="signalBadge">{signal}</p>
        <p id="pnl24" className={pnl.startsWith('+') ? 'good' : 'bad'}>{pnl}</p>
        <p id="riskStat">{risk}</p>
      </motion.div>
    </section>
  );
}

export default Home;
