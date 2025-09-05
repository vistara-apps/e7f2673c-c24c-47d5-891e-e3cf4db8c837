import { NextRequest, NextResponse } from 'next/server';
import { fetchPortfolioData, createApiResponse } from '@/lib/api';
import { rateLimiter } from '@/lib/api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const clientIP = request.ip || 'anonymous';

  if (!userId) {
    return NextResponse.json(
      createApiResponse(null, false, 'User ID is required', 'Missing userId parameter'),
      { status: 400 }
    );
  }

  // Rate limiting
  if (!rateLimiter.canMakeRequest(clientIP)) {
    return NextResponse.json(
      createApiResponse(null, false, 'Rate limit exceeded', 'Too many requests'),
      { status: 429 }
    );
  }

  try {
    const portfolioData = await fetchPortfolioData(userId);
    return NextResponse.json(createApiResponse(portfolioData, true, 'Portfolio data fetched successfully'));
  } catch (error) {
    console.error('Portfolio API error:', error);
    return NextResponse.json(
      createApiResponse(null, false, 'Failed to fetch portfolio data', error instanceof Error ? error.message : 'Unknown error'),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const clientIP = request.ip || 'anonymous';

  // Rate limiting
  if (!rateLimiter.canMakeRequest(clientIP)) {
    return NextResponse.json(
      createApiResponse(null, false, 'Rate limit exceeded', 'Too many requests'),
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { userId, asset, quantity, averageBuyPrice } = body;

    if (!userId || !asset || !quantity || !averageBuyPrice) {
      return NextResponse.json(
        createApiResponse(null, false, 'Missing required fields', 'userId, asset, quantity, and averageBuyPrice are required'),
        { status: 400 }
      );
    }

    // Mock portfolio creation - in production, this would save to database
    const newPortfolioItem = {
      portfolioId: `portfolio_${Date.now()}`,
      userId,
      asset,
      quantity,
      averageBuyPrice,
      createdAt: new Date(),
    };

    return NextResponse.json(createApiResponse(newPortfolioItem, true, 'Portfolio item added successfully'));
  } catch (error) {
    console.error('Portfolio POST API error:', error);
    return NextResponse.json(
      createApiResponse(null, false, 'Failed to add portfolio item', error instanceof Error ? error.message : 'Unknown error'),
      { status: 500 }
    );
  }
}
