import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-crypto-dark via-indigo-900 to-purple-900 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Loading CryptoTrend ProFX</h2>
        <p className="text-gray-300">Fetching the latest market data...</p>
      </div>
    </div>
  );
}
