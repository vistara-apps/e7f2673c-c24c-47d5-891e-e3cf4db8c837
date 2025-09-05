'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Badge } from '@/components/ui/Badge';
import { Flame, TrendingUp, TrendingDown } from 'lucide-react';
import { MarketData } from '@/lib/types';
import { fetchTrendingCoins } from '@/lib/api';
import { formatCurrency, formatPercentage, getPriceChangeColor } from '@/lib/utils';

export function TrendingAssets() {
  const [trendingData, setTrendingData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTrendingData() {
      try {
        setLoading(true);
        const data = await fetchTrendingCoins();
        setTrendingData(data.slice(0, 5)); // Show top 5 trending
        setError(null);
      } catch (err) {
        setError('Failed to load trending data');
        console.error('Error loading trending data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadTrendingData();
    const interval = setInterval(loadTrendingData, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Trending Assets</CardTitle>
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
          <CardTitle>Trending Assets</CardTitle>
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
          <Flame size={20} className="text-orange-400" />
          Trending Assets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {trendingData.map((asset, index) => (
            <div key={asset.asset} className="flex items-center justify-between p-3 rounded-lg hover:bg-white hover:bg-opacity-5 transition-all duration-200">
              <div className="flex items-center gap-3">
                <Badge variant="info" size="sm">
                  #{index + 1}
                </Badge>
                <div>
                  <h4 className="font-semibold text-white">{asset.symbol}</h4>
                  <p className="text-sm text-gray-300">{asset.name}</p>
                </div>
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
