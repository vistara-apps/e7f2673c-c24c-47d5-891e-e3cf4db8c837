// User and Authentication Types
export interface User {
  userId: string;
  farcasterId: string;
  subscriptionTier: 'free' | 'pro' | 'whale';
  notificationPreferences: NotificationPreferences;
  connectedWallets: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationPreferences {
  priceAlerts: boolean;
  volumeAlerts: boolean;
  newsAlerts: boolean;
  portfolioUpdates: boolean;
  marketSignals: boolean;
}

// Portfolio Types
export interface Portfolio {
  portfolioId: string;
  userId: string;
  asset: string;
  symbol: string;
  quantity: number;
  averageBuyPrice: number;
  currentPrice: number;
  totalValue: number;
  pnl: number;
  pnlPercentage: number;
  transactions: Transaction[];
  lastUpdated: Date;
}

export interface Transaction {
  transactionId: string;
  type: 'buy' | 'sell' | 'transfer';
  asset: string;
  quantity: number;
  price: number;
  timestamp: Date;
  txHash?: string;
}

// Alert Types
export interface Alert {
  alertId: string;
  userId: string;
  asset: string;
  symbol: string;
  conditionType: 'price_above' | 'price_below' | 'volume_spike' | 'news_mention';
  value: number;
  status: 'active' | 'triggered' | 'paused';
  createdAt: Date;
  triggeredAt?: Date;
  message?: string;
}

// Market Data Types
export interface MarketData {
  asset: string;
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  volume24h: number;
  volumeChange24h: number;
  marketCap: number;
  rank: number;
  timestamp: Date;
  sentimentScore?: number;
  newsMentions?: number;
}

export interface TrendingAsset extends MarketData {
  trendScore: number;
  category: 'gainer' | 'loser' | 'volume_spike' | 'trending';
}

// Chart Data Types
export interface ChartDataPoint {
  timestamp: number;
  price: number;
  volume?: number;
}

export interface ChartData {
  asset: string;
  timeframe: '1h' | '24h' | '7d' | '30d';
  data: ChartDataPoint[];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
  timestamp: Date;
}

export interface CoinGeckoMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: any;
  last_updated: string;
}

// Component Props Types
export interface AssetCardProps {
  asset: MarketData;
  variant?: 'compact' | 'detailed';
  onClick?: () => void;
}

export interface AlertConfiguratorProps {
  asset?: string;
  onSave: (alert: Omit<Alert, 'alertId' | 'userId' | 'createdAt'>) => void;
  onCancel: () => void;
}

export interface SimpleChartProps {
  data: ChartDataPoint[];
  variant?: 'line' | 'bar';
  height?: number;
  showGrid?: boolean;
  color?: string;
}

export interface NotificationBannerProps {
  variant: 'info' | 'warning' | 'success' | 'error';
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
}

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
}

// Subscription Types
export interface SubscriptionTier {
  id: 'free' | 'pro' | 'whale';
  name: string;
  price: number;
  features: string[];
  limits: {
    alerts: number;
    portfolios: number;
    apiCalls: number;
  };
}
