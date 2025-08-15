import React from 'react';
import { TradingProvider } from './context/TradingContext';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <TradingProvider>
      <div className="min-h-screen bg-gray-900 p-6">
        <Dashboard />
      </div>
    </TradingProvider>
  );
};

export default App;
