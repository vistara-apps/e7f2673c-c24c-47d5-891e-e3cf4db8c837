import { SubscriptionTier, NavItem } from './types';

// API Configuration
export const API_ENDPOINTS = {
  COINGECKO: 'https://api.coingecko.com/api/v3',
  NEWSAPI: 'https://newsapi.org/v2',
  BASE_RPC: 'https://mainnet.base.org',
} as const;

// Subscription Tiers
export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Basic portfolio tracking',
      'Up to 3 price alerts',
      'Daily market updates',
      'Basic trend dashboard'
    ],
    limits: {
      alerts: 3,
      portfolios: 1,
      apiCalls: 100,
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 10,
    features: [
      'Advanced portfolio analytics',
      'Unlimited price alerts',
      'Real-time notifications',
      'Advanced trend analysis',
      'News sentiment tracking',
      'Priority support'
    ],
    limits: {
      alerts: -1, // unlimited
      portfolios: 5,
      apiCalls: 1000,
    },
  },
  {
    id: 'whale',
    name: 'Whale',
    price: 50,
    features: [
      'Everything in Pro',
      'API access',
      'Institutional-grade data',
      'Custom alerts & webhooks',
      'Advanced market signals',
      'Dedicated support',
      'Early access to features'
    ],
    limits: {
      alerts: -1, // unlimited
      portfolios: -1, // unlimited
      apiCalls: 10000,
    },
  },
];

// Navigation Items
export const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'BarChart3',
    path: '/',
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    icon: 'Wallet',
    path: '/portfolio',
  },
  {
    id: 'alerts',
    label: 'Alerts',
    icon: 'Bell',
    path: '/alerts',
  },
  {
    id: 'trends',
    label: 'Trends',
    icon: 'TrendingUp',
    path: '/trends',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'Settings2',
    path: '/settings',
  },
];

// Popular Cryptocurrencies
export const POPULAR_ASSETS = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
  { id: 'polygon', symbol: 'MATIC', name: 'Polygon' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
  { id: 'uniswap', symbol: 'UNI', name: 'Uniswap' },
  { id: 'aave', symbol: 'AAVE', name: 'Aave' },
] as const;

// Chart Configuration
export const CHART_COLORS = {
  primary: '#3b82f6',
  secondary: '#6366f1',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#06b6d4',
} as const;

// Time Intervals
export const TIME_INTERVALS = [
  { label: '1H', value: '1h' },
  { label: '24H', value: '24h' },
  { label: '7D', value: '7d' },
  { label: '30D', value: '30d' },
] as const;

// Alert Condition Types
export const ALERT_CONDITIONS = [
  { value: 'price_above', label: 'Price reaches above' },
  { value: 'price_below', label: 'Price drops below' },
  { value: 'volume_spike', label: 'Volume spike above' },
  { value: 'news_mention', label: 'News mentions increase' },
] as const;

// Market Categories
export const MARKET_CATEGORIES = [
  { id: 'all', label: 'All Assets' },
  { id: 'gainers', label: 'Top Gainers' },
  { id: 'losers', label: 'Top Losers' },
  { id: 'volume', label: 'High Volume' },
  { id: 'trending', label: 'Trending' },
] as const;

// Default Settings
export const DEFAULT_SETTINGS = {
  notifications: {
    priceAlerts: true,
    volumeAlerts: true,
    newsAlerts: false,
    portfolioUpdates: true,
    marketSignals: true,
  },
  display: {
    currency: 'USD',
    theme: 'dark',
    compactMode: false,
  },
  privacy: {
    sharePortfolio: false,
    publicProfile: false,
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  API_LIMIT_EXCEEDED: 'API limit exceeded. Please try again later.',
  INVALID_ADDRESS: 'Invalid wallet address.',
  INSUFFICIENT_PERMISSIONS: 'Insufficient permissions for this action.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  ALERT_CREATED: 'Alert created successfully!',
  ALERT_UPDATED: 'Alert updated successfully!',
  ALERT_DELETED: 'Alert deleted successfully!',
  PORTFOLIO_UPDATED: 'Portfolio updated successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
} as const;
