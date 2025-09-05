'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { WalletConnection } from '@/components/wallet/WalletConnection';
import { QuickStats } from '@/components/dashboard/QuickStats';
import { MarketOverview } from '@/components/dashboard/MarketOverview';
import { TrendingAssets } from '@/components/dashboard/TrendingAssets';
import { PortfolioSummary } from '@/components/portfolio/PortfolioSummary';
import { AlertsList } from '@/components/alerts/AlertsList';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('dashboard');

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
