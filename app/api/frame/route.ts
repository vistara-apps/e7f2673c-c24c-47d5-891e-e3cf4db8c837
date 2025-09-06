import { NextRequest, NextResponse } from 'next/server';
import { createApiResponse } from '@/lib/api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'home';

  try {
    // Generate Frame metadata based on action
    const frameData = generateFrameData(action);
    
    return NextResponse.json(createApiResponse(frameData, true, 'Frame data generated successfully'));
  } catch (error) {
    console.error('Frame API error:', error);
    return NextResponse.json(
      createApiResponse(null, false, 'Failed to generate frame data', error instanceof Error ? error.message : 'Unknown error'),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { untrustedData, trustedData } = body;

    // Validate frame interaction
    if (!untrustedData || !trustedData) {
      return NextResponse.json(
        createApiResponse(null, false, 'Invalid frame data', 'Missing untrustedData or trustedData'),
        { status: 400 }
      );
    }

    const buttonIndex = untrustedData.buttonIndex;
    // const fid = untrustedData.fid; // Store for potential future use

    // Handle different button actions
    let responseFrame;
    switch (buttonIndex) {
      case 1:
        responseFrame = generateFrameData('dashboard');
        break;
      case 2:
        responseFrame = generateFrameData('portfolio');
        break;
      case 3:
        responseFrame = generateFrameData('alerts');
        break;
      case 4:
        responseFrame = generateFrameData('settings');
        break;
      default:
        responseFrame = generateFrameData('home');
    }

    return NextResponse.json(createApiResponse(responseFrame, true, 'Frame interaction processed'));
  } catch (error) {
    console.error('Frame POST API error:', error);
    return NextResponse.json(
      createApiResponse(null, false, 'Failed to process frame interaction', error instanceof Error ? error.message : 'Unknown error'),
      { status: 500 }
    );
  }
}

function generateFrameData(action: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cryptotrend-profx.vercel.app';
  
  const frames = {
    home: {
      image: `${baseUrl}/api/frame/image?type=home`,
      buttons: [
        { label: '📊 Dashboard', action: 'post' },
        { label: '💼 Portfolio', action: 'post' },
        { label: '🔔 Alerts', action: 'post' },
        { label: '⚙️ Settings', action: 'post' }
      ],
      postUrl: `${baseUrl}/api/frame`,
      inputText: null
    },
    dashboard: {
      image: `${baseUrl}/api/frame/image?type=dashboard`,
      buttons: [
        { label: '🔄 Refresh', action: 'post' },
        { label: '📈 Trends', action: 'post' },
        { label: '🏠 Home', action: 'post' },
        { label: '💼 Portfolio', action: 'post' }
      ],
      postUrl: `${baseUrl}/api/frame`,
      inputText: null
    },
    portfolio: {
      image: `${baseUrl}/api/frame/image?type=portfolio`,
      buttons: [
        { label: '➕ Add Asset', action: 'post' },
        { label: '🔄 Refresh', action: 'post' },
        { label: '🏠 Home', action: 'post' },
        { label: '🔔 Alerts', action: 'post' }
      ],
      postUrl: `${baseUrl}/api/frame`,
      inputText: 'Enter asset symbol (e.g., BTC, ETH)'
    },
    alerts: {
      image: `${baseUrl}/api/frame/image?type=alerts`,
      buttons: [
        { label: '➕ New Alert', action: 'post' },
        { label: '🔄 Refresh', action: 'post' },
        { label: '🏠 Home', action: 'post' },
        { label: '💼 Portfolio', action: 'post' }
      ],
      postUrl: `${baseUrl}/api/frame`,
      inputText: 'Enter price target (e.g., BTC:50000)'
    },
    settings: {
      image: `${baseUrl}/api/frame/image?type=settings`,
      buttons: [
        { label: '🔗 Connect Wallet', action: 'link', target: `${baseUrl}/connect` },
        { label: '📱 Notifications', action: 'post' },
        { label: '🏠 Home', action: 'post' },
        { label: '💎 Upgrade', action: 'link', target: `${baseUrl}/upgrade` }
      ],
      postUrl: `${baseUrl}/api/frame`,
      inputText: null
    }
  };

  return frames[action as keyof typeof frames] || frames.home;
}
