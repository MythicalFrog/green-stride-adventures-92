
import React, { ReactNode } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface StatsCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  description: string;
  className?: string;
}

const StatsCard = ({ icon, title, value, description, className }: StatsCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-2">
          <div className="p-1.5 rounded-full bg-muted">
            {icon}
          </div>
          <div className="font-medium text-sm">{title}</div>
        </div>
        <div className="text-2xl font-bold mt-2">{value}</div>
        <div className="text-sm text-muted-foreground mt-1">{description}</div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
