/**
 * Explore Page
 * Browse and search all available cryptocurrencies on the platform
 *
 * @component
 * Route: /explore
 */

import React, { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { Search } from 'lucide-react';
import { getAllCrypto } from '../api/cryptoApi';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCryptos();
  }, []);

  const fetchCryptos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllCrypto(1, 100); // Fetch up to 100 cryptos
      if (response?.success) {
        setCryptos(response.data || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch cryptocurrencies');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = cryptos.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-[122px] min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1180px] mx-auto px-4 md:px-6 py-8">
          <h1 className="text-3xl font-bold mb-6">Explore the crypto economy</h1>

          {/* Search Input using the new Input component */}
          <div className="max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search for an asset"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="max-w-[1180px] mx-auto px-4 md:px-6 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-500">Loading cryptocurrencies...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center mb-6">
            <p className="text-red-600 font-medium mb-4">{error}</p>
            <Button onClick={fetchCryptos} variant="primary">
              Retry
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs uppercase font-medium text-gray-500">
                <tr>
                  <th className="px-6 py-3 text-left tracking-wider">Name</th>
                  <th className="px-6 py-3 text-right tracking-wider">Price</th>
                  <th className="px-6 py-3 text-right tracking-wider">Change (24h)</th>
                  <th className="px-6 py-3 text-right tracking-wider hidden md:table-cell">Market Cap</th>
                  <th className="px-6 py-3 text-right tracking-wider hidden lg:table-cell">Volume (24h)</th>
                  <th className="px-6 py-3 text-right tracking-wider">Trade</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredData.map((coin) => (
                  <tr key={coin._id || coin.symbol} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                          {coin.symbol[0]}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{coin.name}</div>
                          <div className="text-sm text-gray-500">{coin.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      ${coin.price?.toFixed(2)}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${
                        coin.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {coin.change24h >= 0 ? '+' : ''}{coin.change24h?.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 hidden md:table-cell">
                      {coin.marketCap ? `$${(coin.marketCap / 1e9).toFixed(1)}B` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 hidden lg:table-cell">
                      {coin.volume24h ? `$${(coin.volume24h / 1e9).toFixed(1)}B` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="primary" className="py-1.5 px-3 text-xs">Buy</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredData.length === 0 && !loading && (
              <div className="text-center py-12 text-gray-500">
                No assets found matching "{searchTerm}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
