'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Wallet, Plus, RefreshCw } from 'lucide-react';
import { Portfolio } from '@/lib/types';
import { fetchPortfolioData } from '@/lib/api';
import { formatCurrency, formatPercentage, getPriceChangeColor } from '@/lib/utils';

export function PortfolioSummary() {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPortfolio = async () => {
    try {
      setLoading(true);
      const data = await fetchPortfolioData('user-1'); // Mock user ID
      setPortfolio(data);
      setError(null);
    } catch (err) {
      setError('Failed to load portfolio');
      console.error('Error loading portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshPortfolio = async () => {
    try {
      setRefreshing(true);
      const data = await fetchPortfolioData('user-1');
      setPortfolio(data);
      setError(null);
    } catch (err) {
      setError('Failed to refresh portfolio');
      console.error('Error refreshing portfolio:', err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPortfolio();
  }, []);

  const totalValue = portfolio.reduce((sum, asset) => sum + asset.totalValue, 0);
  const totalPnL = portfolio.reduce((sum, asset) => sum + asset.pnl, 0);
  const totalPnLPercentage = totalValue > 0 ? (totalPnL / (totalValue - totalPnL)) * 100 : 0;

  if (loading) {
    return (
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-400 mb-4">{error}</p>
            <Button onClick={loadPortfolio} variant="secondary">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <Card variant="glass">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Wallet size={20} />
              Portfolio Summary
            </CardTitle>
            <div className="flex gap-2">
              <Button
                onClick={refreshPortfolio}
                variant="secondary"
                size="sm"
                loading={refreshing}
              >
                <RefreshCw size={16} />
              </Button>
              <Button variant="primary" size="sm">
                <Plus size={16} />
                Add Asset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-300 mb-1">Total Value</p>
              <p className="text-3xl font-bold text-white">{formatCurrency(totalValue)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-300 mb-1">Total P&L</p>
              <p className={`text-3xl font-bold ${getPriceChangeColor(totalPnL)}`}>
                {formatCurrency(totalPnL)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-300 mb-1">P&L %</p>
              <p className={`text-3xl font-bold ${getPriceChangeColor(totalPnLPercentage)}`}>
                {formatPercentage(totalPnLPercentage)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Holdings */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          {portfolio.length === 0 ? (
            <div className="text-center py-8">
              <Wallet size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-300 mb-4">No assets in your portfolio yet</p>
              <Button variant="primary">
                <Plus size={16} className="mr-2" />
                Add Your First Asset
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {portfolio.map((asset) => (
                <div key={asset.portfolioId} className="metric-card">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-white text-lg">{asset.symbol}</h4>
                      <p className="text-sm text-gray-300">{asset.asset}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white text-lg">
                        {formatCurrency(asset.totalValue)}
                      </p>
                      <p className={`text-sm ${getPriceChangeColor(asset.pnl)}`}>
                        {formatCurrency(asset.pnl)} ({formatPercentage(asset.pnlPercentage)})
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-300">Quantity</p>
                      <p className="text-white font-medium">{asset.quantity}</p>
                    </div>
                    <div>
                      <p className="text-gray-300">Avg. Buy Price</p>
                      <p className="text-white font-medium">{formatCurrency(asset.averageBuyPrice)}</p>
                    </div>
                    <div>
                      <p className="text-gray-300">Current Price</p>
                      <p className="text-white font-medium">{formatCurrency(asset.currentPrice)}</p>
                    </div>
                    <div>
                      <p className="text-gray-300">Last Updated</p>
                      <p className="text-white font-medium">
                        {asset.lastUpdated.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
