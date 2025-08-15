import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TradingContextType {
  portfolioValue: number;
  dailyPnL: number;
  totalTrades: number;
  winRate: number;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined);

export const TradingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tradingData] = useState<TradingContextType>({
    portfolioValue: 250000, // Example value
    dailyPnL: 1250,       // Example value
    totalTrades: 42,      // Example value
    winRate: 68,         // Example value
  });

  return (
    <TradingContext.Provider value={tradingData}>
      {children}
    </TradingContext.Provider>
  );
};

export const useTradingContext = () => {
  const context = useContext(TradingContext);
  if (!context) {
    throw new Error('useTradingContext must be used within a TradingProvider');
  }
  return context;
};
