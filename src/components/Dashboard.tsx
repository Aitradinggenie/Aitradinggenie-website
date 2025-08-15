import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity,
  Target,
  Zap
} from 'lucide-react';
import TradingChart from './TradingChart';
import { useTradingContext } from '../context/TradingContext';

const Dashboard: React.FC = () => {
  const { portfolioValue, dailyPnL, totalTrades, winRate } = useTradingContext();

  const stats = [
    {
      title: 'Portfolio Value',
      value: `$${portfolioValue.toLocaleString()}`,
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Daily P&L',
      value: `$${dailyPnL.toLocaleString()}`,
      change: '+8.2%',
      icon: TrendingUp,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Total Trades',
      value: totalTrades.toString(),
      change: '+15',
      icon: Activity,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: 'Win Rate',
      value: `${winRate}%`,
      change: '+2.1%',
      icon: Target,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10'
    }
  ];

  const recentTrades = [
    { symbol: 'AAPL', type: 'BUY', amount: 100, price: 175.50, profit: '+$250', time: '2 min ago' },
    { symbol: 'TSLA', type: 'SELL', amount: 50, price: 245.80, profit: '+$180', time: '5 min ago' },
    { symbol: 'MSFT', type: 'BUY', amount: 75, price: 380.25, profit: '+$320', time: '8 min ago' },
    { symbol: 'GOOGL', type: 'SELL', amount: 25, price: 2750.00, profit: '+$450', time: '12 min ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/20"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome back, Trader!</h2>
            <p className="text-purple-300">Your AI trading systems are performing exceptionally well today.</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Zap className="w-8 h-8 text-white" />
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-green-400 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trading Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-4">Portfolio Performance</h3>
          <TradingChart />
        </motion.div>

        {/* Recent Trades */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-4">Recent Trades</h3>
          <div className="space-y-4">
            {recentTrades.map((trade, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    trade.type === 'BUY' ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    {trade.type === 'BUY' ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">{trade.symbol}</p>
                    <p className="text-gray-400 text-sm">{trade.amount} shares @ ${trade.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-medium">{trade.profit}</p>
                  <p className="text-gray-400 text-sm">{trade.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/20"
      >
        <h3 className="text-xl font-bold text-white mb-4">AI Market Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-green-400 font-medium">Bullish Signal</p>
            <p className="text-gray-400 text-sm">Tech sector showing strong momentum</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-blue-400 font-medium">High Volatility</p>
            <p className="text-gray-400 text-sm">Increased trading opportunities detected</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <p className="text-purple-400 font-medium">Optimal Entry</p>
            <p className="text-gray-400 text-sm">3 new positions recommended</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
