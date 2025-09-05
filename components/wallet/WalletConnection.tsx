'use client';

import { useState, useEffect } from 'react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar, Address } from '@coinbase/onchainkit/identity';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Wallet as WalletIcon, ExternalLink } from 'lucide-react';
import { useAccount, useDisconnect } from 'wagmi';

export function WalletConnection() {
  const { setFrameReady } = useMiniKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setFrameReady();
  }, [setFrameReady]);

  if (!mounted) {
    return (
      <Card variant="glass">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <WalletIcon size={20} />
          Wallet Connection
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isConnected && address ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-white bg-opacity-5">
              <Avatar address={address} className="w-12 h-12" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Name address={address} className="font-semibold text-white" />
                  <Badge variant="success" size="sm">Connected</Badge>
                </div>
                <Address address={address} className="text-sm text-gray-300" />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={() => window.open(`https://basescan.org/address/${address}`, '_blank')}
                variant="secondary"
                size="sm"
                className="flex-1"
              >
                <ExternalLink size={14} className="mr-2" />
                View on BaseScan
              </Button>
              <Button
                onClick={() => disconnect()}
                variant="outline"
                size="sm"
              >
                Disconnect
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <WalletIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-300 mb-4">
              Connect your wallet to access portfolio tracking and personalized alerts
            </p>
            <Wallet>
              <ConnectWallet className="btn-primary">
                Connect Wallet
              </ConnectWallet>
            </Wallet>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
