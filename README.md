# CryptoTrend ProFX

Your AI-powered crypto market radar for real-time trends and alerts, built as a Base Mini App.

## Features

- **Unified Portfolio Tracker**: Connect your Base wallet to track all crypto holdings in one place
- **Real-Time Market Dashboard**: Live price data, trending assets, and market insights
- **Customizable Alert System**: Set price targets, volume alerts, and news-based notifications
- **AI-Powered Market Signals**: Advanced trend analysis and predictive market indicators
- **Mobile-First Design**: Optimized for Farcaster frames and mobile usage

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base Network integration via OnchainKit
- **Wallet**: MiniKit provider for seamless wallet connections
- **Styling**: Tailwind CSS with custom design system
- **Data**: CoinGecko API for real-time market data
- **TypeScript**: Full type safety throughout the application

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OnchainKit API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cryptotrend-profx
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your OnchainKit API key to `.env.local`:
```
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main application page
│   ├── providers.tsx      # MiniKit and OnchainKit providers
│   └── globals.css        # Global styles and Tailwind
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components (Sidebar)
│   ├── dashboard/        # Dashboard-specific components
│   ├── portfolio/        # Portfolio tracking components
│   ├── alerts/           # Alert management components
│   └── wallet/           # Wallet connection components
├── lib/                  # Utilities and configurations
│   ├── types.ts          # TypeScript type definitions
│   ├── constants.ts      # App constants and configuration
│   ├── utils.ts          # Utility functions
│   └── api.ts            # API functions and data fetching
└── public/               # Static assets
```

## Key Components

### Dashboard
- **QuickStats**: Portfolio value, active alerts, gains overview
- **MarketOverview**: Real-time price data for major cryptocurrencies
- **TrendingAssets**: Top trending coins with price movements

### Portfolio
- **PortfolioSummary**: Complete portfolio overview with P&L tracking
- **WalletConnection**: Base wallet integration via OnchainKit

### Alerts
- **AlertsList**: Manage price alerts and notifications
- **AlertConfigurator**: Create custom alerts for different conditions

## API Integration

The app integrates with several APIs:

- **CoinGecko API**: Real-time cryptocurrency market data
- **Base Network**: On-chain data and wallet integration
- **Farcaster Hubs**: Social features and profile integration

## Subscription Tiers

- **Free**: Basic portfolio tracking, 3 alerts, daily updates
- **Pro ($10/mo)**: Unlimited alerts, real-time data, advanced analytics
- **Whale ($50/mo)**: API access, institutional data, custom webhooks

## Development

### Adding New Features

1. Create components in the appropriate directory under `components/`
2. Add TypeScript types to `lib/types.ts`
3. Update constants in `lib/constants.ts` if needed
4. Add API functions to `lib/api.ts`

### Styling Guidelines

- Use Tailwind CSS classes with the custom design system
- Follow the glass morphism design pattern
- Ensure mobile-first responsive design
- Use the defined color palette for consistency

### Testing

```bash
npm run lint        # ESLint checking
npm run build       # Production build test
```

## Deployment

The app is optimized for deployment on Vercel or similar platforms that support Next.js 15.

1. Connect your repository to your deployment platform
2. Set environment variables in the platform dashboard
3. Deploy automatically on push to main branch

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

Built with ❤️ for the Base ecosystem and Farcaster community.
