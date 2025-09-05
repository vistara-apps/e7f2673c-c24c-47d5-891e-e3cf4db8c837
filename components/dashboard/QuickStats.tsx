'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Wallet, Bell, TrendingUp, Activity } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';

interface QuickStatsProps {
  portfolioValue?: number;
  activeAlerts?: number;
  totalGains?: number;
  marketCap?: number;
}

export function QuickStats({ 
  portfolioValue = 0, 
  activeAlerts = 0, 
  totalGains = 0,
  marketCap = 0 
}: QuickStatsProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      label: 'Portfolio Value',
      value: formatCurrency(portfolioValue),
      icon: Wallet,
      color: 'text-crypto-blue',
      bgColor: 'bg-crypto-blue bg-opacity-20',
    },
    {
      label: 'Active Alerts',
      value: activeAlerts.toString(),
      icon: Bell,
      color: 'text-crypto-green',
      bgColor: 'bg-crypto-green bg-opacity-20',
    },
    {
      label: 'Total Gains',
      value: formatCurrency(totalGains),
      icon: TrendingUp,
      color: 'text-crypto-purple',
      bgColor: 'bg-crypto-purple bg-opacity-20',
    },
    {
      label: 'Market Cap',
      value: `$${formatNumber(marketCap)}`,
      icon: Activity,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400 bg-opacity-20',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} variant="glass">
            <CardContent className="flex justify-center py-8">
              <LoadingSpinner size="md" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} variant="glass" className="hover:bg-opacity-15 transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon size={20} className={stat.color} />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-300">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
