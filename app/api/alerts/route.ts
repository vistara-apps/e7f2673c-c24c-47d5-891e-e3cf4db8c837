import { NextRequest, NextResponse } from 'next/server';
import { fetchUserAlerts, createApiResponse } from '@/lib/api';
import { rateLimiter } from '@/lib/api';
import { Alert } from '@/lib/types';

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
    const alerts = await fetchUserAlerts(userId);
    return NextResponse.json(createApiResponse(alerts, true, 'Alerts fetched successfully'));
  } catch (error) {
    console.error('Alerts API error:', error);
    return NextResponse.json(
      createApiResponse(null, false, 'Failed to fetch alerts', error instanceof Error ? error.message : 'Unknown error'),
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
    const { userId, asset, symbol, conditionType, value } = body;

    if (!userId || !asset || !symbol || !conditionType || !value) {
      return NextResponse.json(
        createApiResponse(null, false, 'Missing required fields', 'userId, asset, symbol, conditionType, and value are required'),
        { status: 400 }
      );
    }

    // Validate condition type
    const validConditions = ['price_above', 'price_below', 'volume_spike', 'news_mention'];
    if (!validConditions.includes(conditionType)) {
      return NextResponse.json(
        createApiResponse(null, false, 'Invalid condition type', `conditionType must be one of: ${validConditions.join(', ')}`),
        { status: 400 }
      );
    }

    // Mock alert creation - in production, this would save to database
    const newAlert: Alert = {
      alertId: `alert_${Date.now()}`,
      userId,
      asset,
      symbol,
      conditionType,
      value,
      status: 'active',
      createdAt: new Date(),
    };

    return NextResponse.json(createApiResponse(newAlert, true, 'Alert created successfully'));
  } catch (error) {
    console.error('Alert POST API error:', error);
    return NextResponse.json(
      createApiResponse(null, false, 'Failed to create alert', error instanceof Error ? error.message : 'Unknown error'),
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const alertId = searchParams.get('alertId');
  const clientIP = request.ip || 'anonymous';

  if (!alertId) {
    return NextResponse.json(
      createApiResponse(null, false, 'Alert ID is required', 'Missing alertId parameter'),
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
    // Mock alert deletion - in production, this would delete from database
    return NextResponse.json(createApiResponse({ alertId }, true, 'Alert deleted successfully'));
  } catch (error) {
    console.error('Alert DELETE API error:', error);
    return NextResponse.json(
      createApiResponse(null, false, 'Failed to delete alert', error instanceof Error ? error.message : 'Unknown error'),
      { status: 500 }
    );
  }
}
