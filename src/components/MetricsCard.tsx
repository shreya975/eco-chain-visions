import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Leaf, 
  Droplets, 
  Wind, 
  Activity,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface MetricData {
  id: string;
  title: string;
  value: string | number;
  unit: string;
  change: number;
  changeType: 'increase' | 'decrease';
  target?: number;
  current?: number;
  icon: 'leaf' | 'droplets' | 'wind' | 'activity';
  color: 'green' | 'blue' | 'orange' | 'purple';
}

interface MetricsCardProps {
  metrics: MetricData[];
  title?: string;
  className?: string;
}

const iconMap = {
  leaf: Leaf,
  droplets: Droplets,
  wind: Wind,
  activity: Activity,
};

const colorMap = {
  green: 'text-success',
  blue: 'text-secondary',
  orange: 'text-warning',
  purple: 'text-accent',
};

export function MetricsCard({ metrics, title = "Environmental Metrics", className }: MetricsCardProps) {
  return (
    <Card className={`shadow-soft ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric) => {
          const Icon = iconMap[metric.icon];
          const isPositive = metric.changeType === 'increase';
          const progress = metric.target && metric.current 
            ? (metric.current / metric.target) * 100 
            : undefined;

          return (
            <div key={metric.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg bg-muted ${colorMap[metric.color]}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {metric.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last updated: 2 hours ago
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">
                    {metric.value}
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      {metric.unit}
                    </span>
                  </p>
                  
                  <div className="flex items-center gap-1">
                    {isPositive ? (
                      <ArrowUp className="h-3 w-3 text-success" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-destructive" />
                    )}
                    <span className={`text-xs font-medium ${
                      isPositive ? 'text-success' : 'text-destructive'
                    }`}>
                      {Math.abs(metric.change)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress bar for target metrics */}
              {progress !== undefined && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress to target</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress 
                    value={progress} 
                    className="h-2"
                  />
                </div>
              )}

              {/* Trend indicator */}
              <div className="flex items-center gap-2">
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    isPositive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {isPositive ? 'Improving' : 'Declining'}
                </Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}