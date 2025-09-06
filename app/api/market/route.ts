import { NextRequest, NextResponse } from 'next/server';
import { fetchMarketData, fetchTrendingCoins, createApiResponse } from '@/lib/api';
import { rateLimiter } from '@/lib/api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'market';
  const ids = searchParams.get('ids')?.split(',') || ['bitcoin', 'ethereum', 'binancecoin'];
  const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'anonymous';

  // Rate limiting
  if (!rateLimiter.canMakeRequest(clientIP)) {
    return NextResponse.json(
      createApiResponse(null, false, 'Rate limit exceeded', 'Too many requests'),
      { status: 429 }
    );
  }

  try {
    let data;
    
    switch (type) {
      case 'trending':
        data = await fetchTrendingCoins();
        break;
      case 'market':
      default:
        data = await fetchMarketData(ids);
        break;
    }

    return NextResponse.json(createApiResponse(data, true, 'Market data fetched successfully'));
  } catch (error) {
    console.error('Market API error:', error);
    return NextResponse.json(
      createApiResponse(null, false, 'Failed to fetch market data', error instanceof Error ? error.message : 'Unknown error'),
      { status: 500 }
    );
  }
}
