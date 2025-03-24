
import React from 'react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  children,
  className
}) => {
  return (
    <div 
      className={cn(
        "rounded-lg border border-border bg-card p-4 shadow-sm card-hover",
        className
      )}
    >
      <h3 className="text-base font-medium text-card-foreground mb-3">{title}</h3>
      <div className="text-card-foreground">{children}</div>
    </div>
  );
};

export default DashboardCard;
