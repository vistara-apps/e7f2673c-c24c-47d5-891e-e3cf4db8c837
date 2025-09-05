import { NextRequest, NextResponse } from 'next/server';
import { fetchMarketData } from '@/lib/api';
import { formatCurrency, formatPercentage } from '@/lib/utils';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'home';

  try {
    // Generate SVG image based on type
    const svg = await generateFrameImage(type);
    
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      },
    });
  } catch (error) {
    console.error('Frame image generation error:', error);
    
    // Return a fallback error image
    const errorSvg = generateErrorImage();
    return new NextResponse(errorSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  }
}

async function generateFrameImage(type: string): Promise<string> {
  const width = 1200;
  const height = 630;
  
  switch (type) {
    case 'home':
      return generateHomeImage(width, height);
    case 'dashboard':
      return await generateDashboardImage(width, height);
    case 'portfolio':
      return await generatePortfolioImage(width, height);
    case 'alerts':
      return generateAlertsImage(width, height);
    case 'settings':
      return generateSettingsImage(width, height);
    default:
      return generateHomeImage(width, height);
  }
}

function generateHomeImage(width: number, height: number): string {
  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1e1b4b;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#312e81;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#581c87;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#bg)"/>
      
      <!-- Logo/Title -->
      <text x="600" y="200" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="64" font-weight="bold">
        CryptoTrend ProFX
      </text>
      
      <!-- Tagline -->
      <text x="600" y="260" text-anchor="middle" fill="#a5b4fc" font-family="Arial, sans-serif" font-size="28">
        Your AI-powered crypto market radar
      </text>
      
      <!-- Features -->
      <text x="600" y="350" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24">
        📊 Real-time Market Data  •  💼 Portfolio Tracking  •  🔔 Smart Alerts
      </text>
      
      <!-- Call to Action -->
      <rect x="450" y="420" width="300" height="80" rx="40" fill="#3b82f6" opacity="0.8"/>
      <text x="600" y="470" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">
        Get Started
      </text>
      
      <!-- Footer -->
      <text x="600" y="580" text-anchor="middle" fill="#6b7280" font-family="Arial, sans-serif" font-size="18">
        Powered by Base • Built for Farcaster
      </text>
    </svg>
  `;
}

async function generateDashboardImage(width: number, height: number): Promise<string> {
  try {
    const marketData = await fetchMarketData(['bitcoin', 'ethereum', 'binancecoin']);
    const btc = marketData.find(coin => coin.asset === 'bitcoin');
    const eth = marketData.find(coin => coin.asset === 'ethereum');
    const bnb = marketData.find(coin => coin.asset === 'binancecoin');

    return `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#bg)"/>
        
        <!-- Header -->
        <text x="60" y="80" fill="white" font-family="Arial, sans-serif" font-size="36" font-weight="bold">
          Market Dashboard
        </text>
        
        <!-- BTC -->
        ${btc ? `
          <rect x="60" y="120" width="340" height="120" rx="12" fill="#1f2937" opacity="0.8"/>
          <text x="80" y="160" fill="#f59e0b" font-family="Arial, sans-serif" font-size="24" font-weight="bold">
            ${btc.symbol}
          </text>
          <text x="80" y="190" fill="white" font-family="Arial, sans-serif" font-size="28">
            ${formatCurrency(btc.price)}
          </text>
          <text x="80" y="220" fill="${btc.priceChangePercentage24h >= 0 ? '#10b981' : '#ef4444'}" font-family="Arial, sans-serif" font-size="20">
            ${formatPercentage(btc.priceChangePercentage24h)}
          </text>
        ` : ''}
        
        <!-- ETH -->
        ${eth ? `
          <rect x="420" y="120" width="340" height="120" rx="12" fill="#1f2937" opacity="0.8"/>
          <text x="440" y="160" fill="#627eea" font-family="Arial, sans-serif" font-size="24" font-weight="bold">
            ${eth.symbol}
          </text>
          <text x="440" y="190" fill="white" font-family="Arial, sans-serif" font-size="28">
            ${formatCurrency(eth.price)}
          </text>
          <text x="440" y="220" fill="${eth.priceChangePercentage24h >= 0 ? '#10b981' : '#ef4444'}" font-family="Arial, sans-serif" font-size="20">
            ${formatPercentage(eth.priceChangePercentage24h)}
          </text>
        ` : ''}
        
        <!-- BNB -->
        ${bnb ? `
          <rect x="780" y="120" width="340" height="120" rx="12" fill="#1f2937" opacity="0.8"/>
          <text x="800" y="160" fill="#f0b90b" font-family="Arial, sans-serif" font-size="24" font-weight="bold">
            ${bnb.symbol}
          </text>
          <text x="800" y="190" fill="white" font-family="Arial, sans-serif" font-size="28">
            ${formatCurrency(bnb.price)}
          </text>
          <text x="800" y="220" fill="${bnb.priceChangePercentage24h >= 0 ? '#10b981' : '#ef4444'}" font-family="Arial, sans-serif" font-size="20">
            ${formatPercentage(bnb.priceChangePercentage24h)}
          </text>
        ` : ''}
        
        <!-- Market Status -->
        <rect x="60" y="280" width="1080" height="80" rx="12" fill="#1f2937" opacity="0.6"/>
        <text x="80" y="320" fill="#10b981" font-family="Arial, sans-serif" font-size="24" font-weight="bold">
          🟢 Market Status: Active
        </text>
        <text x="80" y="345" fill="#9ca3af" font-family="Arial, sans-serif" font-size="18">
          Last updated: ${new Date().toLocaleTimeString()}
        </text>
        
        <!-- Navigation Hint -->
        <text x="600" y="550" text-anchor="middle" fill="#6b7280" font-family="Arial, sans-serif" font-size="20">
          Use buttons below to navigate • Real-time data from CoinGecko
        </text>
      </svg>
    `;
  } catch (error) {
    return generateErrorImage();
  }
}

async function generatePortfolioImage(width: number, height: number): Promise<string> {
  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0c4a6e;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#bg)"/>
      
      <!-- Header -->
      <text x="60" y="80" fill="white" font-family="Arial, sans-serif" font-size="36" font-weight="bold">
        Portfolio Overview
      </text>
      
      <!-- Total Value -->
      <rect x="60" y="120" width="500" height="100" rx="12" fill="#1f2937" opacity="0.8"/>
      <text x="80" y="160" fill="#9ca3af" font-family="Arial, sans-serif" font-size="20">
        Total Portfolio Value
      </text>
      <text x="80" y="195" fill="white" font-family="Arial, sans-serif" font-size="36" font-weight="bold">
        $57,000.00
      </text>
      
      <!-- 24h Change -->
      <rect x="580" y="120" width="500" height="100" rx="12" fill="#1f2937" opacity="0.8"/>
      <text x="600" y="160" fill="#9ca3af" font-family="Arial, sans-serif" font-size="20">
        24h Change
      </text>
      <text x="600" y="195" fill="#10b981" font-family="Arial, sans-serif" font-size="36" font-weight="bold">
        +$2,340 (+4.3%)
      </text>
      
      <!-- Holdings -->
      <text x="60" y="280" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">
        Top Holdings
      </text>
      
      <!-- BTC Holding -->
      <rect x="60" y="300" width="1080" height="60" rx="8" fill="#1f2937" opacity="0.6"/>
      <text x="80" y="335" fill="#f59e0b" font-family="Arial, sans-serif" font-size="20" font-weight="bold">
        BTC • 0.5 BTC • $25,000
      </text>
      <text x="1000" y="335" fill="#10b981" font-family="Arial, sans-serif" font-size="20">
        +11.1%
      </text>
      
      <!-- ETH Holding -->
      <rect x="60" y="370" width="1080" height="60" rx="8" fill="#1f2937" opacity="0.6"/>
      <text x="80" y="405" fill="#627eea" font-family="Arial, sans-serif" font-size="20" font-weight="bold">
        ETH • 10 ETH • $32,000
      </text>
      <text x="1000" y="405" fill="#10b981" font-family="Arial, sans-serif" font-size="20">
        +6.7%
      </text>
      
      <!-- Footer -->
      <text x="600" y="550" text-anchor="middle" fill="#6b7280" font-family="Arial, sans-serif" font-size="18">
        Connect your wallet to see real portfolio data
      </text>
    </svg>
  `;
}

function generateAlertsImage(width: number, height: number): string {
  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#7c2d12;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#dc2626;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#bg)"/>
      
      <!-- Header -->
      <text x="60" y="80" fill="white" font-family="Arial, sans-serif" font-size="36" font-weight="bold">
        Active Alerts
      </text>
      
      <!-- Alert Count -->
      <rect x="60" y="120" width="300" height="80" rx="12" fill="#1f2937" opacity="0.8"/>
      <text x="80" y="155" fill="#fbbf24" font-family="Arial, sans-serif" font-size="24" font-weight="bold">
        🔔 3 Active Alerts
      </text>
      
      <!-- Alert 1 -->
      <rect x="60" y="220" width="1080" height="70" rx="8" fill="#1f2937" opacity="0.6"/>
      <text x="80" y="250" fill="#f59e0b" font-family="Arial, sans-serif" font-size="20" font-weight="bold">
        BTC Price Alert
      </text>
      <text x="80" y="275" fill="white" font-family="Arial, sans-serif" font-size="18">
        Notify when BTC reaches $55,000
      </text>
      <text x="1000" y="260" fill="#10b981" font-family="Arial, sans-serif" font-size="16">
        ACTIVE
      </text>
      
      <!-- Alert 2 -->
      <rect x="60" y="300" width="1080" height="70" rx="8" fill="#1f2937" opacity="0.6"/>
      <text x="80" y="330" fill="#627eea" font-family="Arial, sans-serif" font-size="20" font-weight="bold">
        ETH Price Alert
      </text>
      <text x="80" y="355" fill="white" font-family="Arial, sans-serif" font-size="18">
        Notify when ETH drops below $3,000
      </text>
      <text x="1000" y="340" fill="#10b981" font-family="Arial, sans-serif" font-size="16">
        ACTIVE
      </text>
      
      <!-- Alert 3 -->
      <rect x="60" y="380" width="1080" height="70" rx="8" fill="#1f2937" opacity="0.6"/>
      <text x="80" y="410" fill="#8b5cf6" font-family="Arial, sans-serif" font-size="20" font-weight="bold">
        Volume Spike Alert
      </text>
      <text x="80" y="435" fill="white" font-family="Arial, sans-serif" font-size="18">
        Notify on unusual trading volume
      </text>
      <text x="1000" y="420" fill="#10b981" font-family="Arial, sans-serif" font-size="16">
        ACTIVE
      </text>
      
      <!-- Footer -->
      <text x="600" y="550" text-anchor="middle" fill="#fbbf24" font-family="Arial, sans-serif" font-size="18">
        Never miss important market movements
      </text>
    </svg>
  `;
}

function generateSettingsImage(width: number, height: number): string {
  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#374151;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#6b7280;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#bg)"/>
      
      <!-- Header -->
      <text x="60" y="80" fill="white" font-family="Arial, sans-serif" font-size="36" font-weight="bold">
        Settings & Configuration
      </text>
      
      <!-- Wallet Status -->
      <rect x="60" y="120" width="1080" height="80" rx="12" fill="#1f2937" opacity="0.8"/>
      <text x="80" y="155" fill="#ef4444" font-family="Arial, sans-serif" font-size="24" font-weight="bold">
        🔗 Wallet: Not Connected
      </text>
      <text x="80" y="180" fill="#9ca3af" font-family="Arial, sans-serif" font-size="18">
        Connect your Base wallet to access full features
      </text>
      
      <!-- Subscription -->
      <rect x="60" y="220" width="520" height="100" rx="12" fill="#1f2937" opacity="0.6"/>
      <text x="80" y="255" fill="#fbbf24" font-family="Arial, sans-serif" font-size="20" font-weight="bold">
        💎 Subscription: Free Tier
      </text>
      <text x="80" y="280" fill="#9ca3af" font-family="Arial, sans-serif" font-size="16">
        • 3 alerts maximum
      </text>
      <text x="80" y="300" fill="#9ca3af" font-family="Arial, sans-serif" font-size="16">
        • Basic market data
      </text>
      
      <!-- Notifications -->
      <rect x="600" y="220" width="540" height="100" rx="12" fill="#1f2937" opacity="0.6"/>
      <text x="620" y="255" fill="#10b981" font-family="Arial, sans-serif" font-size="20" font-weight="bold">
        🔔 Notifications: Enabled
      </text>
      <text x="620" y="280" fill="#9ca3af" font-family="Arial, sans-serif" font-size="16">
        • Price alerts: ON
      </text>
      <text x="620" y="300" fill="#9ca3af" font-family="Arial, sans-serif" font-size="16">
        • Portfolio updates: ON
      </text>
      
      <!-- Upgrade CTA -->
      <rect x="60" y="350" width="1080" height="80" rx="12" fill="#3b82f6" opacity="0.8"/>
      <text x="600" y="385" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">
        🚀 Upgrade to Pro for Advanced Features
      </text>
      <text x="600" y="410" text-anchor="middle" fill="#dbeafe" font-family="Arial, sans-serif" font-size="18">
        Unlimited alerts • Premium data • Priority support
      </text>
      
      <!-- Footer -->
      <text x="600" y="550" text-anchor="middle" fill="#9ca3af" font-family="Arial, sans-serif" font-size="18">
        Customize your CryptoTrend ProFX experience
      </text>
    </svg>
  `;
}

function generateErrorImage(): string {
  return `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1f2937"/>
      <text x="600" y="300" text-anchor="middle" fill="#ef4444" font-family="Arial, sans-serif" font-size="36" font-weight="bold">
        ⚠️ Error Loading Data
      </text>
      <text x="600" y="350" text-anchor="middle" fill="#9ca3af" font-family="Arial, sans-serif" font-size="24">
        Please try again later
      </text>
    </svg>
  `;
}
