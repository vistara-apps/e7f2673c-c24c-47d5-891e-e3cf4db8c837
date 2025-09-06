'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Bell, Plus, X, TrendingUp, TrendingDown, Volume2, Newspaper } from 'lucide-react';
import { Alert } from '@/lib/types';
import { AlertConfiguratorProps } from '@/lib/types';

export function AlertConfigurator({ asset, onSave, onCancel }: AlertConfiguratorProps) {
  const [formData, setFormData] = useState({
    asset: asset || '',
    symbol: '',
    conditionType: 'price_above' as Alert['conditionType'],
    value: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const conditionTypes = [
    {
      id: 'price_above' as const,
      label: 'Price Above',
      icon: TrendingUp,
      description: 'Alert when price goes above target',
      color: 'text-green-400',
    },
    {
      id: 'price_below' as const,
      label: 'Price Below',
      icon: TrendingDown,
      description: 'Alert when price drops below target',
      color: 'text-red-400',
    },
    {
      id: 'volume_spike' as const,
      label: 'Volume Spike',
      icon: Volume2,
      description: 'Alert on unusual trading volume',
      color: 'text-blue-400',
    },
    {
      id: 'news_mention' as const,
      label: 'News Mention',
      icon: Newspaper,
      description: 'Alert on relevant news mentions',
      color: 'text-purple-400',
    },
  ];

  const popularAssets = [
    { symbol: 'BTC', name: 'Bitcoin', id: 'bitcoin' },
    { symbol: 'ETH', name: 'Ethereum', id: 'ethereum' },
    { symbol: 'BNB', name: 'BNB', id: 'binancecoin' },
    { symbol: 'SOL', name: 'Solana', id: 'solana' },
    { symbol: 'ADA', name: 'Cardano', id: 'cardano' },
    { symbol: 'DOT', name: 'Polkadot', id: 'polkadot' },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.asset.trim()) {
      newErrors.asset = 'Asset is required';
    }

    if (!formData.symbol.trim()) {
      newErrors.symbol = 'Symbol is required';
    }

    if (!formData.value.trim()) {
      newErrors.value = 'Value is required';
    } else if (isNaN(Number(formData.value)) || Number(formData.value) <= 0) {
      newErrors.value = 'Value must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSave({
      asset: formData.asset,
      symbol: formData.symbol.toUpperCase(),
      conditionType: formData.conditionType,
      value: Number(formData.value),
      status: 'active',
    });
  };

  const handleAssetSelect = (assetData: { symbol: string; name: string; id: string }) => {
    setFormData(prev => ({
      ...prev,
      asset: assetData.id,
      symbol: assetData.symbol,
    }));
    setErrors(prev => ({ ...prev, asset: '', symbol: '' }));
  };

  const selectedCondition = conditionTypes.find(c => c.id === formData.conditionType);

  return (
    <Card variant="glass" className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell size={20} />
            Create New Alert
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-gray-400 hover:text-white"
          >
            <X size={16} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Asset Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Select Asset
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
              {popularAssets.map((assetData) => (
                <button
                  key={assetData.id}
                  type="button"
                  onClick={() => handleAssetSelect(assetData)}
                  className={`p-3 rounded-lg border transition-all ${
                    formData.asset === assetData.id
                      ? 'border-crypto-blue bg-crypto-blue bg-opacity-20 text-white'
                      : 'border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white'
                  }`}
                >
                  <div className="font-semibold">{assetData.symbol}</div>
                  <div className="text-xs opacity-75">{assetData.name}</div>
                </button>
              ))}
            </div>
            
            {/* Custom Asset Input */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Custom asset ID"
                  value={formData.asset}
                  onChange={(e) => setFormData(prev => ({ ...prev, asset: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-crypto-blue focus:outline-none"
                />
                {errors.asset && (
                  <p className="text-red-400 text-sm mt-1">{errors.asset}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Symbol (e.g., BTC)"
                  value={formData.symbol}
                  onChange={(e) => setFormData(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-crypto-blue focus:outline-none"
                />
                {errors.symbol && (
                  <p className="text-red-400 text-sm mt-1">{errors.symbol}</p>
                )}
              </div>
            </div>
          </div>

          {/* Condition Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Alert Condition
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {conditionTypes.map((condition) => {
                const Icon = condition.icon;
                return (
                  <button
                    key={condition.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, conditionType: condition.id }))}
                    className={`p-4 rounded-lg border transition-all text-left ${
                      formData.conditionType === condition.id
                        ? 'border-crypto-blue bg-crypto-blue bg-opacity-20'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon size={20} className={condition.color} />
                      <span className="font-semibold text-white">{condition.label}</span>
                    </div>
                    <p className="text-sm text-gray-400">{condition.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Value Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {selectedCondition?.id.includes('price') ? 'Target Price ($)' : 
               selectedCondition?.id === 'volume_spike' ? 'Volume Threshold (%)' : 
               'Threshold Value'}
            </label>
            <input
              type="number"
              step="any"
              placeholder={
                selectedCondition?.id.includes('price') ? '50000' :
                selectedCondition?.id === 'volume_spike' ? '200' :
                '1'
              }
              value={formData.value}
              onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-crypto-blue focus:outline-none"
            />
            {errors.value && (
              <p className="text-red-400 text-sm mt-1">{errors.value}</p>
            )}
            {selectedCondition && (
              <p className="text-gray-400 text-sm mt-1">
                {selectedCondition.id === 'price_above' && 'Alert when price goes above this value'}
                {selectedCondition.id === 'price_below' && 'Alert when price drops below this value'}
                {selectedCondition.id === 'volume_spike' && 'Alert when volume increases by this percentage'}
                {selectedCondition.id === 'news_mention' && 'Alert when mentioned in news (1 = any mention)'}
              </p>
            )}
          </div>

          {/* Preview */}
          {formData.asset && formData.symbol && formData.value && (
            <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Alert Preview</h4>
              <div className="flex items-center gap-2">
                <Badge variant="info" className="text-crypto-blue border-crypto-blue">
                  {formData.symbol}
                </Badge>
                <span className="text-gray-300">
                  {selectedCondition?.label}: {formData.value}
                  {selectedCondition?.id.includes('price') && ' USD'}
                  {selectedCondition?.id === 'volume_spike' && '%'}
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1"
              disabled={!formData.asset || !formData.symbol || !formData.value}
            >
              <Plus size={16} className="mr-2" />
              Create Alert
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="px-6"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
