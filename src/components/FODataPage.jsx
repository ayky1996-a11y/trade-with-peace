import React, { useState, useEffect } from 'react';
import { fetchGoogleSheetData } from '@/lib/googleSheets';
import { Button } from './ui/button';
import { AlertCircle, Loader } from 'lucide-react';

const FODataPage = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Google Sheet ID from your shared link
  const SHEET_ID = '1UTxRr3xX3pGW1cYGiB_tLz5Z4-TML1PvE6NfiGQtorA';

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Starting to load F&O data...');
        const { headers: h, data: d } = await fetchGoogleSheetData(SHEET_ID);
        console.log('Data loaded successfully:', { headers: h, dataCount: d.length });
        setHeaders(h);
        setData(d);
      } catch (err) {
        console.error('Error in loadData:', err);
        setError(`Failed to load F&O data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const refreshData = () => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const { headers: h, data: d } = await fetchGoogleSheetData(SHEET_ID);
        setHeaders(h);
        setData(d);
      } catch (err) {
        setError('Failed to load F&O data. Please ensure the Google Sheet is publicly shared.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  };

  const openGoogleSheet = () => {
    window.open(`https://docs.google.com/spreadsheets/d/${SHEET_ID}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent mb-4">
            F&O Daily Data
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Real-time Futures & Options market data
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-wrap gap-4">
          <Button
            onClick={refreshData}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? (
              <>
                <Loader className="animate-spin mr-2" size={16} />
                Loading...
              </>
            ) : (
              'Refresh Data'
            )}
          </Button>
          <Button
            onClick={openGoogleSheet}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-slate-700"
          >
            Open Full Sheet
          </Button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8 flex gap-3">
            <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0" size={20} />
            <div>
              <p className="text-red-800 dark:text-red-200 font-semibold">Error Loading Data</p>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <Loader className="animate-spin w-12 h-12 text-blue-600 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">Loading F&O data...</p>
            </div>
          </div>
        )}

        {/* Data Table */}
        {!loading && !error && data.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-blue-600 to-green-500 sticky top-0 z-10">
                  <tr>
                    {headers.map((header, idx) => (
                      <th
                        key={idx}
                        className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap text-xs"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {data.slice(0, 50).map((row, rowIdx) => (
                    <tr
                      key={rowIdx}
                      className="hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      {headers.map((header, colIdx) => (
                        <td
                          key={colIdx}
                          className="px-3 py-3 text-slate-700 dark:text-slate-300 whitespace-nowrap text-xs"
                          title={row[header] || ''}
                        >
                          {typeof row[header] === 'number' ? row[header].toLocaleString() : (row[header] || '-')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-sm border-t border-slate-200 dark:border-slate-600">
              Showing {Math.min(50, data.length)} of {data.length} entries
              {data.length > 50 && <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">(Scroll or open full sheet for more)</span>}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && data.length === 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-12 text-center">
            <p className="text-slate-600 dark:text-slate-400 text-lg">No data available</p>
            <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">
              Check that your Google Sheet has data and is publicly shared
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FODataPage;
