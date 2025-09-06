import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cryptotrend-profx.vercel.app';

export const metadata: Metadata = {
  title: 'CryptoTrend ProFX',
  description: 'Your AI-powered crypto market radar for real-time trends and alerts',
  keywords: ['crypto', 'trading', 'alerts', 'portfolio', 'base', 'minikit', 'farcaster'],
  authors: [{ name: 'CryptoTrend ProFX' }],
  openGraph: {
    title: 'CryptoTrend ProFX',
    description: 'Your AI-powered crypto market radar for real-time trends and alerts',
    type: 'website',
    url: baseUrl,
    images: [
      {
        url: `${baseUrl}/api/frame/image?type=home`,
        width: 1200,
        height: 630,
        alt: 'CryptoTrend ProFX - Your AI-powered crypto market radar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CryptoTrend ProFX',
    description: 'Your AI-powered crypto market radar for real-time trends and alerts',
    images: [`${baseUrl}/api/frame/image?type=home`],
  },
  other: {
    // Frame metadata
    'fc:frame': 'vNext',
    'fc:frame:image': `${baseUrl}/api/frame/image?type=home`,
    'fc:frame:button:1': '📊 Dashboard',
    'fc:frame:button:2': '💼 Portfolio',
    'fc:frame:button:3': '🔔 Alerts',
    'fc:frame:button:4': '⚙️ Settings',
    'fc:frame:post_url': `${baseUrl}/api/frame`,
    'og:image': `${baseUrl}/api/frame/image?type=home`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
