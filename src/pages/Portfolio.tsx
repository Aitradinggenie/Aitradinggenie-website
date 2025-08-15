import React from 'react';
import TradingChart from '../components/TradingChart';

const Portfolio: React.FC = () => {
  return (
    <div className="p-6 min-h-screen bg-gray-900">
      <h1 className="text-2xl font-bold text-white mb-4">Portfolio Overview</h1>
      <TradingChart />
    </div>
  );
};

export default Portfolio;
