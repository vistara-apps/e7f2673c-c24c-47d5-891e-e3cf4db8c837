import { API_ENDPOINTS } from './constants';
import { CoinGeckoMarketData, MarketData, ApiResponse } from './types';

// CoinGecko API functions
export async function fetchMarketData(
  ids: string[] = ['bitcoin', 'ethereum', 'binancecoin'],
  vsCurrency: string = 'usd'
): Promise<MarketData[]> {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.COINGECKO}/coins/markets?ids=${ids.join(',')}&vs_currency=${vsCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: CoinGeckoMarketData[] = await response.json();
    
    return data.map(coin => ({
      asset: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      price: coin.current_price,
      priceChange24h: coin.price_change_24h,
      priceChangePercentage24h: coin.price_change_percentage_24h,
      volume24h: coin.total_volume,
      volumeChange24h: 0, // CoinGecko doesn't provide volume change directly
      marketCap: coin.market_cap,
      rank: coin.market_cap_rank,
      timestamp: new Date(),
    }));
  } catch (error) {
    console.error('Error fetching market data:', error);
    throw error;
  }
}

export async function fetchTrendingCoins(): Promise<MarketData[]> {
  try {
    const response = await fetch(`${API_ENDPOINTS.COINGECKO}/search/trending`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const trendingIds = data.coins.slice(0, 10).map((coin: any) => coin.item.id);
    
    return await fetchMarketData(trendingIds);
  } catch (error) {
    console.error('Error fetching trending coins:', error);
    throw error;
  }
}

export async function fetchCoinHistory(
  coinId: string,
  days: number = 7,
  vsCurrency: string = 'usd'
): Promise<{ prices: [number, number][] }> {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.COINGECKO}/coins/${coinId}/market_chart?vs_currency=${vsCurrency}&days=${days}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching coin history:', error);
    throw error;
  }
}

// Mock API functions for development
export async function fetchPortfolioData(userId: string): Promise<any[]> {
  // Mock portfolio data
  return [
    {
      portfolioId: '1',
      userId,
      asset: 'bitcoin',
      symbol: 'BTC',
      quantity: 0.5,
      averageBuyPrice: 45000,
      currentPrice: 50000,
      totalValue: 25000,
      pnl: 2500,
      pnlPercentage: 11.11,
      transactions: [],
      lastUpdated: new Date(),
    },
    {
      portfolioId: '2',
      userId,
      asset: 'ethereum',
      symbol: 'ETH',
      quantity: 10,
      averageBuyPrice: 3000,
      currentPrice: 3200,
      totalValue: 32000,
      pnl: 2000,
      pnlPercentage: 6.67,
      transactions: [],
      lastUpdated: new Date(),
    },
  ];
}

export async function fetchUserAlerts(userId: string): Promise<any[]> {
  // Mock alerts data
  return [
    {
      alertId: '1',
      userId,
      asset: 'bitcoin',
      symbol: 'BTC',
      conditionType: 'price_above',
      value: 55000,
      status: 'active',
      createdAt: new Date(),
    },
    {
      alertId: '2',
      userId,
      asset: 'ethereum',
      symbol: 'ETH',
      conditionType: 'price_below',
      value: 3000,
      status: 'active',
      createdAt: new Date(),
    },
  ];
}

// News API functions (mock for now)
export async function fetchCryptoNews(): Promise<any[]> {
  // Mock news data
  return [
    {
      title: 'Bitcoin Reaches New All-Time High',
      description: 'Bitcoin surpasses previous records amid institutional adoption.',
      url: '#',
      publishedAt: new Date(),
      source: { name: 'CryptoNews' },
    },
    {
      title: 'Ethereum 2.0 Upgrade Shows Promise',
      description: 'The latest Ethereum upgrade demonstrates improved scalability.',
      url: '#',
      publishedAt: new Date(),
      source: { name: 'BlockchainToday' },
    },
  ];
}

// Utility function to handle API responses
export function createApiResponse<T>(
  data: T,
  success: boolean = true,
  message?: string,
  error?: string
): ApiResponse<T> {
  return {
    data,
    success,
    message,
    error,
    timestamp: new Date(),
  };
}

// Rate limiting utility
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private limit: number;
  private windowMs: number;

  constructor(limit: number = 100, windowMs: number = 60000) {
    this.limit = limit;
    this.windowMs = windowMs;
  }

  canMakeRequest(key: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.limit) {
      return false;
    }

    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }
}

export const rateLimiter = new RateLimiter();
