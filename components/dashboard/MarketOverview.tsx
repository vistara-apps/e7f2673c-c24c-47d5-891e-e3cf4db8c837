'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { MarketData } from '@/lib/types';
import { fetchMarketData } from '@/lib/api';
import { formatCurrency, formatPercentage, getPriceChangeColor } from '@/lib/utils';

export function MarketOverview() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMarketData() {
      try {
        setLoading(true);
        const data = await fetchMarketData(['bitcoin', 'ethereum', 'binancecoin', 'solana']);
        setMarketData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load market data');
        console.error('Error loading market data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadMarketData();
    const interval = setInterval(loadMarketData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
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
          <CardTitle>Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-red-400">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity size={20} />
          Market Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {marketData.map((asset) => (
            <div key={asset.asset} className="metric-card">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-white">{asset.symbol}</h4>
                  <p className="text-sm text-gray-300">{asset.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">
                    {formatCurrency(asset.price)}
                  </p>
                  <div className={`flex items-center gap-1 text-sm ${getPriceChangeColor(asset.priceChangePercentage24h)}`}>
                    {asset.priceChangePercentage24h > 0 ? (
                      <TrendingUp size={14} />
                    ) : (
                      <TrendingDown size={14} />
                    )}
                    {formatPercentage(asset.priceChangePercentage24h)}
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-300">
                <span>24h Volume</span>
                <span>{formatCurrency(asset.volume24h, 'USD', 0, 0)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
