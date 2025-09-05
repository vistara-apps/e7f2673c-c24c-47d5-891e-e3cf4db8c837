'use client';

import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-crypto-dark via-indigo-900 to-purple-900 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <AlertTriangle size={64} className="mx-auto text-red-400 mb-6" />
        <h2 className="text-2xl font-bold text-white mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-300 mb-6">
          We encountered an error while loading CryptoTrend ProFX. Please try again.
        </p>
        <div className="space-y-3">
          <Button onClick={reset} variant="primary" className="w-full">
            Try Again
          </Button>
          <Button 
            onClick={() => window.location.href = '/'} 
            variant="secondary" 
            className="w-full"
          >
            Go Home
          </Button>
        </div>
        {error.message && (
          <details className="mt-6 text-left">
            <summary className="text-sm text-gray-400 cursor-pointer">
              Error Details
            </summary>
            <pre className="mt-2 text-xs text-red-400 bg-red-900 bg-opacity-20 p-3 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
