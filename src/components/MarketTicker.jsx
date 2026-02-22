import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

// Use internal proxy endpoint (Vercel serverless function) to avoid CORS and handle rate limits
const YAHOO_QUOTE_URL = '/api/quotes';

const mapToYahooSymbol = (symbol) => {
  const s = symbol.toUpperCase();
  if (s.includes('NIFTY')) return '^NSEI';
  if (s.includes('SENSEX') || s === 'SENSEX') return '^BSESN';
  if (s.includes('BANK')) return '^NSEBANK';
  if (s.includes('.') || s.startsWith('^')) return s;
  return `${s}.NS`;
};

const MarketTicker = ({ data }) => {
  const [currentData, setCurrentData] = useState([]);
  const [liveAvailable, setLiveAvailable] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    const fetchQuotes = async () => {
      try {
        const symbols = data.map(d => mapToYahooSymbol(d.symbol)).join(',');
        const res = await fetch(`${YAHOO_QUOTE_URL}?symbols=${encodeURIComponent(symbols)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const quotes = (json.quoteResponse && json.quoteResponse.result) || [];
        // Determine how many symbols we got back
        const matches = data.map(item => {
          const yahoo = quotes.find(q => {
            const qsym = (q.symbol || '').toUpperCase();
            return qsym === mapToYahooSymbol(item.symbol).toUpperCase();
          });

          if (!yahoo) return null;

          const price = yahoo.regularMarketPrice ?? yahoo.regularMarketPreviousClose ?? null;
          const changePercent = yahoo.regularMarketChangePercent ?? null;
          const trend = changePercent != null ? (changePercent >= 0 ? 'up' : 'down') : item.trend;

          return {
            ...item,
            price: price != null ? Number(price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : item.price,
            change: changePercent != null ? `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%` : item.change,
            trend
          };
        }).filter(Boolean);

        if (mounted.current) {
          if (matches.length > 0) {
            setCurrentData(matches);
            setLiveAvailable(true);
          } else {
            // no live results -> disable ticker
            setLiveAvailable(false);
          }
        }
      } catch (err) {
        console.debug('MarketTicker: live fetch failed — disabling ticker:', err.message);
        if (mounted.current) setLiveAvailable(false);
      }
    };

    fetchQuotes();

    const liveInterval = setInterval(fetchQuotes, 5000);

    return () => {
      mounted.current = false;
      clearInterval(liveInterval);
    };
  }, [data]);

  return (
    <div className="bg-slate-900 text-white py-2 overflow-hidden border-b border-slate-700">
      <div className="ticker-wrapper">
        <div className="ticker-content">
          {liveAvailable && [...currentData, ...currentData].map((item, index) => (
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
