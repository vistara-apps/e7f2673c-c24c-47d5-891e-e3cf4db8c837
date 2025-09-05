'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Bell, Plus, Trash2, Pause, Play } from 'lucide-react';
import { Alert } from '@/lib/types';
import { fetchUserAlerts } from '@/lib/api';
import { formatCurrency, formatTimeAgo } from '@/lib/utils';

export function AlertsList() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAlerts() {
      try {
        setLoading(true);
        const data = await fetchUserAlerts('user-1'); // Mock user ID
        setAlerts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load alerts');
        console.error('Error loading alerts:', err);
      } finally {
        setLoading(false);
      }
    }

    loadAlerts();
  }, []);

  const toggleAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.alertId === alertId 
        ? { ...alert, status: alert.status === 'active' ? 'paused' : 'active' }
        : alert
    ));
  };

  const deleteAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.alertId !== alertId));
  };

  const getConditionText = (alert: Alert) => {
    switch (alert.conditionType) {
      case 'price_above':
        return `Price reaches above ${formatCurrency(alert.value)}`;
      case 'price_below':
        return `Price drops below ${formatCurrency(alert.value)}`;
      case 'volume_spike':
        return `Volume spike above ${alert.value}%`;
      case 'news_mention':
        return `News mentions increase by ${alert.value}%`;
      default:
        return 'Unknown condition';
    }
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'paused':
        return 'warning';
      case 'triggered':
        return 'info';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Your Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Your Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-red-400">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell size={20} />
            Your Alerts ({alerts.length})
          </CardTitle>
          <Button variant="primary" size="sm">
            <Plus size={16} className="mr-2" />
            Create Alert
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <Bell size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-300 mb-4">No alerts configured yet</p>
            <Button variant="primary">
              <Plus size={16} className="mr-2" />
              Create Your First Alert
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.alertId} className="metric-card">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-white">{alert.symbol}</h4>
                      <Badge variant={getBadgeVariant(alert.status)} size="sm">
                        {alert.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      {getConditionText(alert)}
                    </p>
                    <p className="text-xs text-gray-400">
                      Created {formatTimeAgo(alert.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => toggleAlert(alert.alertId)}
                      variant="secondary"
                      size="sm"
                    >
                      {alert.status === 'active' ? (
                        <Pause size={14} />
                      ) : (
                        <Play size={14} />
                      )}
                    </Button>
                    <Button
                      onClick={() => deleteAlert(alert.alertId)}
                      variant="secondary"
                      size="sm"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
                {alert.triggeredAt && (
                  <div className="text-xs text-crypto-green">
                    Triggered {formatTimeAgo(alert.triggeredAt)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
