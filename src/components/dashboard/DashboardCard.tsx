
import React from 'react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  actionButton?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  children,
  className,
  actionButton
}) => {
  return (
    <div 
      className={cn(
        "rounded-lg border border-border bg-card p-4 shadow-sm card-hover",
        className
      )}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-medium text-card-foreground">{title}</h3>
        {actionButton && (
          <div>{actionButton}</div>
        )}
      </div>
      <div className="text-card-foreground">{children}</div>
    </div>
  );
};

export default DashboardCard;
