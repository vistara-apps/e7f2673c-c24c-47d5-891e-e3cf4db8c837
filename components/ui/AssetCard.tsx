'use client';

import React, { useState } from 'react';
import { Card, CardContent } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { MiniChart } from './SimpleChart';
import { TrendingUp, TrendingDown, Star, Plus, ExternalLink } from 'lucide-react';
import { AssetCardProps, ChartDataPoint } from '@/lib/types';
import { formatCurrency, formatPercentage, getPriceChangeColor } from '@/lib/utils';

export function AssetCard({ asset, variant = 'compact', onClick }: AssetCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Mock chart data - in production, fetch from API
  const mockChartData: ChartDataPoint[] = Array.from({ length: 24 }, (_, i) => ({
    timestamp: Date.now() - (23 - i) * 60 * 60 * 1000,
    price: asset.price * (1 + (Math.random() - 0.5) * 0.1),
    volume: asset.volume24h * (0.8 + Math.random() * 0.4),
  }));

  const priceChangeColor = getPriceChangeColor(asset.priceChangePercentage24h);
  const isPositive = asset.priceChangePercentage24h >= 0;

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleAddAlert = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In production, open alert configurator
    console.log('Add alert for', asset.symbol);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://www.coingecko.com/en/coins/${asset.asset}`, '_blank');
  };

  if (variant === 'detailed') {
    return (
      <Card 
        variant="glass" 
        className="hover:bg-opacity-15 transition-all duration-200 cursor-pointer"
        onClick={onClick}
      >
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-crypto-blue to-crypto-purple rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {asset.symbol.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{asset.symbol}</h3>
                <p className="text-gray-400 text-sm">{asset.name}</p>
                {asset.rank && (
                  <Badge variant="info" size="sm" className="mt-1">
                    #{asset.rank}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFavoriteToggle}
                className={isFavorite ? 'text-yellow-400' : 'text-gray-400'}
              >
                <Star size={16} fill={isFavorite ? 'currentColor' : 'none'} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAddAlert}
                className="text-gray-400 hover:text-crypto-blue"
              >
                <Plus size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleViewDetails}
                className="text-gray-400 hover:text-white"
              >
                <ExternalLink size={16} />
              </Button>
            </div>
          </div>

          {/* Price and Change */}
          <div className="mb-4">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-2xl font-bold text-white">
                {formatCurrency(asset.price)}
              </span>
              <div className={`flex items-center gap-1 ${priceChangeColor}`}>
                {isPositive ? (
                  <TrendingUp size={16} />
                ) : (
                  <TrendingDown size={16} />
                )}
                <span className="font-semibold">
                  {formatPercentage(asset.priceChangePercentage24h)}
                </span>
              </div>
            </div>
            <p className={`text-sm ${priceChangeColor}`}>
              {isPositive ? '+' : ''}{formatCurrency(asset.priceChange24h)} (24h)
            </p>
          </div>

          {/* Chart */}
          <div className="mb-4">
            <MiniChart 
              data={mockChartData} 
              color={isPositive ? '#10b981' : '#ef4444'}
              height={80}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400 mb-1">Market Cap</p>
              <p className="text-white font-semibold">
                {formatCurrency(asset.marketCap, 'USD', 0, 0)}
              </p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">24h Volume</p>
              <p className="text-white font-semibold">
                {formatCurrency(asset.volume24h, 'USD', 0, 0)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Compact variant
  return (
    <Card 
      variant="glass" 
      className="hover:bg-opacity-15 transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-crypto-blue to-crypto-purple rounded-full flex items-center justify-center">
              <span className="text-white font-bold">
                {asset.symbol.charAt(0)}
              </span>
            </div>
            <div>
              <h4 className="font-semibold text-white">{asset.symbol}</h4>
              <p className="text-sm text-gray-400">{asset.name}</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="font-bold text-white">
              {formatCurrency(asset.price)}
            </p>
            <div className={`flex items-center gap-1 text-sm ${priceChangeColor}`}>
              {isPositive ? (
                <TrendingUp size={12} />
              ) : (
                <TrendingDown size={12} />
              )}
              {formatPercentage(asset.priceChangePercentage24h)}
            </div>
          </div>
        </div>
        
        {/* Mini chart for compact view */}
        <div className="mt-3">
          <MiniChart 
            data={mockChartData} 
            color={isPositive ? '#10b981' : '#ef4444'}
            height={40}
          />
        </div>
        
        {/* Quick stats */}
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Vol: {formatCurrency(asset.volume24h, 'USD', 0, 0)}</span>
          {asset.rank && <span>#{asset.rank}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
