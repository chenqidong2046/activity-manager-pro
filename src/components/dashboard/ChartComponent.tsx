
import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { cn } from '@/lib/utils';

type ChartType = 'area' | 'bar' | 'pie';

interface ChartProps {
  type: ChartType;
  data: any[];
  className?: string;
  colors?: string[];
  dataKey?: string;
  xAxisKey?: string;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  onPieClick?: (data: any, index: number) => void;
  activeIndex?: number | null;
}

const DEFAULT_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A67BF4'];

const ChartComponent: React.FC<ChartProps> = ({
  type,
  data,
  className,
  colors = DEFAULT_COLORS,
  dataKey = 'value',
  xAxisKey = 'name',
  height = 300,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  onPieClick,
  activeIndex = null,
}) => {
  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#f0f0f0' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#f0f0f0' }}
            />
            {showTooltip && <Tooltip contentStyle={{ borderRadius: '8px' }} />}
            {showLegend && <Legend wrapperStyle={{ fontSize: '12px' }} />}
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={colors[0]}
              fill={colors[0]}
              fillOpacity={0.2}
            />
          </AreaChart>
        );
        
      case 'bar':
        return (
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#f0f0f0' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#f0f0f0' }}
            />
            {showTooltip && <Tooltip contentStyle={{ borderRadius: '8px' }} />}
            {showLegend && <Legend wrapperStyle={{ fontSize: '12px' }} />}
            <Bar
              dataKey={dataKey}
              radius={[4, 4, 0, 0]}
              fill={colors[0]}
            />
          </BarChart>
        );
        
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKey}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              onClick={onPieClick}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length]} 
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
                  stroke={activeIndex === index ? "#333" : "none"}
                  strokeWidth={activeIndex === index ? 2 : 0}
                />
              ))}
            </Pie>
            {showTooltip && <Tooltip contentStyle={{ borderRadius: '8px' }} />}
            {showLegend && <Legend wrapperStyle={{ fontSize: '12px' }} />}
          </PieChart>
        );
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
