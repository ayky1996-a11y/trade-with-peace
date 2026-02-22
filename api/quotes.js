// Simple Vercel serverless function to proxy Yahoo Finance quote endpoint.
// - Caches responses per-symbol-list for a short TTL to avoid rate limits.
// - If Yahoo returns 429 and we have a cached response, return cached data.
// - If Yahoo returns 429 and no cache, return 503.

const CACHE = {}; // { [key: symbols]: { ts: number, data: any } }
const TTL_MS = 15 * 1000; // 15 seconds cache

module.exports = async function (req, res) {
  try {
    const symbols = req.query.symbols || req.url.split('?symbols=')[1] || '';
    if (!symbols) {
      res.statusCode = 400;
      return res.json({ error: 'symbols query parameter required' });
    }

    const key = symbols;
    const now = Date.now();

    // Return cached if fresh
    if (CACHE[key] && (now - CACHE[key].ts) < TTL_MS) {
      res.setHeader('x-cache', 'HIT');
      return res.status(200).json(CACHE[key].data);
    }

    const yahooUrl = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols)}`;

    const yahooRes = await fetch(yahooUrl, { headers: { 'User-Agent': 'Vercel-Serverless-Proxy' } });
    const text = await yahooRes.text();

    // If rate limited
    if (yahooRes.status === 429) {
      if (CACHE[key]) {
        res.setHeader('x-cache', 'STALE');
        return res.status(200).json(CACHE[key].data);
      }
      res.setHeader('x-cache', 'MISS');
      return res.status(503).json({ error: 'rate_limited', message: 'Yahoo Finance rate limited this request (429)' });
    }

    if (!yahooRes.ok) {
      res.setHeader('x-cache', 'MISS');
      res.statusCode = yahooRes.status;
      // try to send text body
      try {
        return res.send(text);
      } catch (e) {
        return res.json({ error: `upstream ${yahooRes.status}` });
      }
    }

    const json = JSON.parse(text);
    // Cache and return
    CACHE[key] = { ts: now, data: json };
    res.setHeader('x-cache', 'MISS');
    return res.status(200).json(json);
  } catch (err) {
    // On error, return cached if available
    try {
      const symbols = req.query.symbols || req.url.split('?symbols=')[1] || '';
      const key = symbols;
      if (CACHE[key]) {
        res.setHeader('x-cache', 'ERROR_STALE');
        return res.status(200).json(CACHE[key].data);
      }
    } catch (e) {
      // ignore
    }

    console.error('quotes proxy error:', err);
    res.statusCode = 500;
    return res.json({ error: err.message || String(err) });
  }
};
