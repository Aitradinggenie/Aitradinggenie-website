import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Trades from './pages/Trades';
import Insights from './pages/Insights';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <nav className="p-4 bg-gray-800 flex space-x-6">
          <Link to="/" className="text-white font-medium">Home</Link>
          <Link to="/portfolio" className="text-white font-medium">Portfolio</Link>
          <Link to="/trades" className="text-white font-medium">Trades</Link>
          <Link to="/insights" className="text-white font-medium">Insights</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/trades" element={<Trades />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
