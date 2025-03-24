
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
}) => {
  return (
    <div 
      className={cn(
        "relative rounded-lg border border-border bg-card p-4 shadow-sm overflow-hidden card-hover",
        className
      )}
    >
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-card-foreground">
            {value}
          </h3>
          
          {trend && (
            <p 
              className={cn(
                "mt-1 text-xs font-medium",
                trend.isPositive ? "text-green-500" : "text-red-500"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </p>
          )}
          
          {description && (
            <p className="mt-2 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Icon size={20} className="text-primary" />
          </div>
        )}
      </div>
      
      {/* Decorative element */}
      <div className="absolute right-0 bottom-0 h-16 w-16 rounded-tl-full bg-primary/5" />
    </div>
  );
};

export default StatCard;
