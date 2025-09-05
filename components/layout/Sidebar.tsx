'use client';

import { useState } from 'react';
import { 
  BarChart3, 
  Wallet, 
  Bell, 
  TrendingUp, 
  Settings2,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'portfolio', label: 'Portfolio', icon: Wallet },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'trends', label: 'Trends', icon: TrendingUp },
  { id: 'settings', label: 'Settings', icon: Settings2 },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg glass-card"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:inset-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="sidebar-nav h-full">
          <div className="p-6">
            <h1 className="text-xl font-bold text-gradient">CryptoTrend ProFX</h1>
            <p className="text-sm text-gray-300 mt-1">AI-powered crypto radar</p>
          </div>
          
          <nav className="px-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'nav-item w-full text-left',
                    activeTab === item.id && 'active'
                  )}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
