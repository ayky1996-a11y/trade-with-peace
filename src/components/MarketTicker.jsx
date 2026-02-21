import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MarketTicker = ({ data }) => {
  const [currentData, setCurrentData] = useState(data);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData(prev => prev.map(item => ({
        ...item,
        price: (parseFloat(item.price.replace(/,/g, '')) + (Math.random() - 0.5) * 10).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        change: `${Math.random() > 0.5 ? '+' : '-'}${(Math.random() * 2).toFixed(2)}%`,
        trend: Math.random() > 0.5 ? 'up' : 'down'
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 text-white py-2 overflow-hidden border-b border-slate-700">
      <div className="ticker-wrapper">
        <div className="ticker-content">
          {[...currentData, ...currentData].map((item, index) => (
            <div key={index} className="ticker-item inline-flex items-center gap-2 px-6">
              <span className="font-semibold text-sm">{item.symbol}</span>
              <span className="text-slate-300 text-sm">₹{item.price}</span>
              <span className={`flex items-center gap-1 text-sm font-medium ${
                item.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {item.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketTicker;
