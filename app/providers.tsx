'use client';

import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base } from 'wagmi/chains';
import { type ReactNode, useState } from 'react';
import { WalletProvider } from '@/components/wallet/WalletProvider';
import { ToastProvider } from '@/components/ui/NotificationBanner';

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <MiniKitProvider
        chain={base}
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'cdp_demo_key'}
      >
        <WalletProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </WalletProvider>
      </MiniKitProvider>
    </QueryClientProvider>
  );
}
