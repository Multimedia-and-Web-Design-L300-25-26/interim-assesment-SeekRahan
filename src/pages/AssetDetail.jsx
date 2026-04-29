/**
 * AssetDetail Page
 * Displays detailed information about a specific cryptocurrency asset
 *
 * @component
 * Routes: /price/:coin
 */

import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { ArrowUp, ArrowDown, TrendingUp, BarChart3, DollarSign } from 'lucide-react';
import { cryptoData } from '../data/cryptoData';

const AssetDetail = () => {
  const { coin } = useParams();
  const navigate = useNavigate();

  // Find the cryptocurrency from mock data
  const asset = useMemo(() => {
    return cryptoData.find((c) =>
      c.name.toLowerCase() === coin?.toLowerCase() ||
      c.code.toLowerCase() === coin?.toLowerCase()
    );
  }, [coin]);

  // If asset not found, show 404-like message
  if (!asset) {
    return (
      <div className="pt-[72px] min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Asset not found</h1>
          <p className="text-gray-500 mb-8">
            We couldn't find the cryptocurrency "{coin}" in our system.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('/explore')} variant="primary">
              Browse all assets
            </Button>
            <Button onClick={() => navigate('/')} variant="outline">
              Back to home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isPositive = asset.change.startsWith('+');

  return (
    <div className="pt-[72px] min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-[1180px] mx-auto px-4 md:px-6">
          <button
            onClick={() => navigate('/explore')}
            className="mb-6 text-blue-100 hover:text-white flex items-center gap-2 text-sm"
          >
            ← Back to Explorer
          </button>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                  {asset.code[0]}
                </div>
                <div>
                  <h1 className="text-4xl font-bold">{asset.name}</h1>
                  <p className="text-blue-100 text-lg">{asset.code}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1180px] mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Price Section */}
          <Card className="md:col-span-2" variant="featured">
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-gray-500 text-sm font-medium mb-2">
                  Current Price
                </h2>
                <div className="flex items-baseline gap-4">
                  <p className="text-5xl font-bold text-gray-900">
                    ${asset.price}
                  </p>
                  <div
                    className={`flex items-center gap-1 text-lg font-bold ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUp size={20} />
                    ) : (
                      <ArrowDown size={20} />
                    )}
                    {asset.change}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-200 flex gap-3">
                <Button variant="primary" className="flex-1">
                  Buy {asset.code}
                </Button>
                <Button variant="secondary" className="flex-1">
                  Sell {asset.code}
                </Button>
              </div>

              {/* Chart Placeholder */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Price Chart
                </h3>
                <div className="w-full h-64 bg-gradient-to-b from-blue-50 to-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                  <div className="text-center">
                    <TrendingUp size={48} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-gray-400 text-sm">
                      Chart feature coming soon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats Sidebar */}
          <div className="space-y-4">
            <Card variant="default">
              <div className="flex items-start gap-3">
                <DollarSign className="text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    Market Cap
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {asset.marketCap}
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="default">
              <div className="flex items-start gap-3">
                <BarChart3 className="text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    24h Volume
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {asset.volume}
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="default">
              <div className="flex items-start gap-3">
                <TrendingUp
                  className={`flex-shrink-0 mt-1 ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    24h Change
                  </p>
                  <p
                    className={`text-xl font-bold ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {asset.change}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About {asset.name}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {asset.name} ({asset.code}) is a digital asset in the cryptocurrency
            market. This is a mock implementation of the asset details page. In a
            production application, this would display real-time data, detailed
            charts, market analysis, and comprehensive information about the asset.
          </p>
        </div>

        {/* Related Actions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Ready to trade {asset.code}?
          </h3>
          <p className="text-gray-600 mb-6">
            Create an account to start buying and selling {asset.name} today.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="primary">Get started</Button>
            <Button variant="secondary">Learn more</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetail;
