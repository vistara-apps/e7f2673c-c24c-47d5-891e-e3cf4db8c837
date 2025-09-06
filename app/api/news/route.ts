import { NextRequest, NextResponse } from 'next/server';
import { fetchCryptoNews, createApiResponse } from '@/lib/api';
import { rateLimiter } from '@/lib/api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  // const query = searchParams.get('query') || 'cryptocurrency'; // For future use
  const limit = parseInt(searchParams.get('limit') || '10');
  const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'anonymous';

  // Rate limiting
  if (!rateLimiter.canMakeRequest(clientIP)) {
    return NextResponse.json(
      createApiResponse(null, false, 'Rate limit exceeded', 'Too many requests'),
      { status: 429 }
    );
  }

  try {
    const news = await fetchCryptoNews();
    const limitedNews = news.slice(0, limit);
    
    return NextResponse.json(createApiResponse(limitedNews, true, 'News fetched successfully'));
  } catch (error) {
    console.error('News API error:', error);
    return NextResponse.json(
      createApiResponse(null, false, 'Failed to fetch news', error instanceof Error ? error.message : 'Unknown error'),
      { status: 500 }
    );
  }
}
