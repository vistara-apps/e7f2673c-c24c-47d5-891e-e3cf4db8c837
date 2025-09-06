'use client';

import { useMemo } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SimpleChartProps, ChartDataPoint } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

export function SimpleChart({ 
  data, 
  variant = 'line', 
  height = 300, 
  showGrid = true, 
  color = '#3b82f6' 
}: SimpleChartProps) {
  const chartData = useMemo(() => {
    return data.map((point, index) => ({
      ...point,
      index,
      formattedTime: new Date(point.timestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      formattedDate: new Date(point.timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
    }));
  }, [data]);

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { date: string; price: number; formattedDate: string; formattedTime: string; volume?: number }; value: number }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-gray-300 text-sm mb-1">
            {data.formattedDate} at {data.formattedTime}
          </p>
          <p className="text-white font-semibold">
            Price: {formatCurrency(payload[0].value)}
          </p>
          {data.volume && (
            <p className="text-gray-400 text-sm">
              Volume: {formatCurrency(data.volume, 'USD', 0, 0)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const commonProps = {
    data: chartData,
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
  };

  const renderChart = () => {
    switch (variant) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#374151" />}
            <XAxis 
              dataKey="formattedTime" 
              stroke="#9ca3af" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#9ca3af" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrency(value, 'USD', 0, 0)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke={color}
              fill={color}
              fillOpacity={0.2}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: color }}
            />
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#374151" />}
            <XAxis 
              dataKey="formattedTime" 
              stroke="#9ca3af" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#9ca3af" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrency(value, 'USD', 0, 0)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="price"
              fill={color}
              opacity={0.8}
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        );

      case 'line':
      default:
        return (
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#374151" />}
            <XAxis 
              dataKey="formattedTime" 
              stroke="#9ca3af" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#9ca3af" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrency(value, 'USD', 0, 0)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: color }}
            />
          </LineChart>
        );
    }
  };

  if (!data || data.length === 0) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-800 bg-opacity-30 rounded-lg"
        style={{ height }}
      >
        <p className="text-gray-400">No chart data available</p>
      </div>
    );
  }

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}

// Mini chart component for compact displays
export function MiniChart({ 
  data, 
  color = '#3b82f6', 
  height = 60 
}: { 
  data: ChartDataPoint[]; 
  color?: string; 
  height?: number; 
}) {
  const chartData = useMemo(() => {
    return data.map((point, index) => ({
      ...point,
      index,
    }));
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-800 bg-opacity-30 rounded"
        style={{ height }}
      >
        <div className="w-full h-1 bg-gray-600 rounded"></div>
      </div>
    );
  }

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <Line
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
