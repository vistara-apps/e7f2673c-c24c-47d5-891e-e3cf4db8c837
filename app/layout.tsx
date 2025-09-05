import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CryptoTrend ProFX',
  description: 'Your AI-powered crypto market radar for real-time trends and alerts',
  keywords: ['crypto', 'trading', 'alerts', 'portfolio', 'base', 'minikit'],
  authors: [{ name: 'CryptoTrend ProFX' }],
  openGraph: {
    title: 'CryptoTrend ProFX',
    description: 'Your AI-powered crypto market radar for real-time trends and alerts',
    type: 'website',
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
