'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { WalletConnection } from '@/components/wallet/WalletConnection';
import { QuickStats } from '@/components/dashboard/QuickStats';
import { MarketOverview } from '@/components/dashboard/MarketOverview';
import { TrendingAssets } from '@/components/dashboard/TrendingAssets';
import { PortfolioSummary } from '@/components/portfolio/PortfolioSummary';
import { AlertsList } from '@/components/alerts/AlertsList';
import { useNotifications } from '@/components/ui/NotificationBanner';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Zap, Bell } from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { showSuccess, showInfo } = useNotifications();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <QuickStats 
              portfolioValue={57000}
              activeAlerts={3}
              totalGains={5200}
              marketCap={2400000000000}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MarketOverview />
              <TrendingAssets />
            </div>
          </div>
        );
      case 'portfolio':
        return <PortfolioSummary />;
      case 'alerts':
        return <AlertsList />;
      case 'trends':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MarketOverview />
            <TrendingAssets />
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <WalletConnection />
            
            {/* Subscription Management */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap size={20} />
                  Subscription Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-white">Free Tier</h3>
                    <p className="text-gray-400 text-sm">3 alerts maximum • Basic market data</p>
                  </div>
                  <Button 
                    onClick={() => showInfo('Upgrade feature coming soon!')}
                    className="bg-gradient-to-r from-crypto-blue to-crypto-purple"
                  >
                    Upgrade to Pro
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Active Alerts</p>
                    <p className="text-white font-semibold">3 / 3</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Data Sources</p>
                    <p className="text-white font-semibold">Basic</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell size={20} />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Price Alerts</p>
                      <p className="text-gray-400 text-sm">Get notified when price targets are hit</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => showSuccess('Price alerts enabled!')}
                    >
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Portfolio Updates</p>
                      <p className="text-gray-400 text-sm">Daily portfolio performance summaries</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => showSuccess('Portfolio updates enabled!')}
                    >
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Market News</p>
                      <p className="text-gray-400 text-sm">Breaking news and market updates</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => showInfo('Market news notifications disabled')}
                    >
                      Disabled
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <QuickStats 
              portfolioValue={57000}
              activeAlerts={3}
              totalGains={5200}
              marketCap={2400000000000}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MarketOverview />
              <TrendingAssets />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-crypto-dark via-indigo-900 to-purple-900">
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 lg:ml-0">
          <div className="container mx-auto px-4 py-6 lg:py-8 lg:pl-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'portfolio' && 'Portfolio'}
                {activeTab === 'alerts' && 'Alerts'}
                {activeTab === 'trends' && 'Market Trends'}
                {activeTab === 'settings' && 'Settings'}
              </h1>
              <p className="text-gray-300">
                {activeTab === 'dashboard' && 'Your AI-powered crypto market radar'}
                {activeTab === 'portfolio' && 'Track your crypto investments'}
                {activeTab === 'alerts' && 'Manage your price and market alerts'}
                {activeTab === 'trends' && 'Discover trending cryptocurrencies'}
                {activeTab === 'settings' && 'Configure your account and preferences'}
              </p>
            </div>
            
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
