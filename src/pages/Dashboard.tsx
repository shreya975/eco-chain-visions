import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { MetricsCard } from '@/components/MetricsCard';
import { MapView } from '@/components/MapView';
import { TransactionTable } from '@/components/TransactionTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  TrendingUp, 
  Activity, 
  Globe,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

// Mock data
const mockMetrics = [
  {
    id: '1',
    title: 'CO₂ Sequestered',
    value: '2,847',
    unit: 'tons',
    change: 12.5,
    changeType: 'increase' as const,
    target: 5000,
    current: 2847,
    icon: 'leaf' as const,
    color: 'green' as const
  },
  {
    id: '2',
    title: 'Biodiversity Index',
    value: '87.2',
    unit: 'score',
    change: 5.8,
    changeType: 'increase' as const,
    target: 100,
    current: 87.2,
    icon: 'activity' as const,
    color: 'blue' as const
  },
  {
    id: '3',
    title: 'Project Health',
    value: '94.6',
    unit: '%',
    change: 2.3,
    changeType: 'increase' as const,
    icon: 'droplets' as const,
    color: 'purple' as const
  },
  {
    id: '4',
    title: 'Active Projects',
    value: '156',
    unit: 'projects',
    change: 8.1,
    changeType: 'increase' as const,
    icon: 'wind' as const,
    color: 'orange' as const
  }
];

const mockProjects = [
  {
    id: '1',
    name: 'Amazon Reforestation Initiative',
    type: 'reforestation' as const,
    lat: -3.4653,
    lng: -62.2159,
    status: 'active' as const,
    metrics: { co2: 1247, area: 850, biodiversity: 92 }
  },
  {
    id: '2',
    name: 'Coral Reef Restoration',
    type: 'conservation' as const,
    lat: -16.2897,
    lng: 145.7781,
    status: 'active' as const,
    metrics: { co2: 456, area: 120, biodiversity: 78 }
  },
  {
    id: '3',
    name: 'Urban Forest Project',
    type: 'cleanup' as const,
    lat: 40.7128,
    lng: -74.0060,
    status: 'completed' as const,
    metrics: { co2: 234, area: 45, biodiversity: 65 }
  },
  {
    id: '4',
    name: 'Wetland Research Study',
    type: 'research' as const,
    lat: 29.7604,
    lng: -95.3698,
    status: 'planned' as const,
    metrics: { co2: 0, area: 200, biodiversity: 0 }
  }
];

const mockTransactions = [
  {
    id: '1',
    hash: '0x742d35cc6e4c8b6e8a2f6b8e9a7c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d',
    type: 'project_creation' as const,
    from: '0x742d35cc6e4c8b6e8a2f6b8e9a7c3d4e5f6a7b8c',
    to: '0x9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e',
    amount: 50,
    currency: 'ECO',
    timestamp: '2024-01-15T10:30:00Z',
    status: 'confirmed' as const,
    blockNumber: 18543201,
    gasUsed: 84562,
    description: 'Amazon Reforestation Initiative - Project Registration'
  },
  {
    id: '2',
    hash: '0x8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0',
    type: 'carbon_credit' as const,
    from: '0x5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a',
    to: '0x742d35cc6e4c8b6e8a2f6b8e9a7c3d4e5f6a7b8c',
    amount: 1000,
    currency: 'CCT',
    timestamp: '2024-01-15T09:15:00Z',
    status: 'confirmed' as const,
    blockNumber: 18543189,
    gasUsed: 65432,
    description: 'Carbon Credit Issuance - 1000 tons CO₂ sequestered'
  },
  {
    id: '3',
    hash: '0x3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5',
    type: 'verification' as const,
    from: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    to: '0x742d35cc6e4c8b6e8a2f6b8e9a7c3d4e5f6a7b8c',
    timestamp: '2024-01-15T08:45:00Z',
    status: 'pending' as const,
    blockNumber: 18543156,
    gasUsed: 42156,
    description: 'Third-party verification of biodiversity metrics'
  }
];

export default function Dashboard() {
  const [userRole, setUserRole] = useState<string>('govt');
  const [userName, setUserName] = useState<string>('Admin');

  useEffect(() => {
    const role = localStorage.getItem('userRole') || 'govt';
    const name = localStorage.getItem('userName') || 'Admin';
    setUserRole(role);
    setUserName(name);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={userRole as any} 
        userName={userName} 
        notifications={3} 
      />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-earth rounded-xl p-6 text-primary-foreground shadow-green">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Welcome back, {userName}!
              </h1>
              <p className="text-primary-foreground/80">
                Monitor environmental projects and track blockchain transactions in real-time
              </p>
            </div>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-primary-foreground border-white/20">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                  <p className="text-xl font-bold">124</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Verification</p>
                  <p className="text-xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Growth</p>
                  <p className="text-xl font-bold">+12.5%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Issues</p>
                  <p className="text-xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Metrics */}
          <MetricsCard 
            metrics={mockMetrics}
            title="Live Environmental Metrics"
            className="lg:col-span-1"
          />

          {/* Map View */}
          <MapView 
            projects={mockProjects}
            className="lg:col-span-1"
          />
        </div>

        {/* Recent Activity & Blockchain Log */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="shadow-soft xl:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  action: 'Project Verified',
                  project: 'Amazon Reforestation',
                  time: '2 hours ago',
                  status: 'success'
                },
                {
                  action: 'Carbon Credits Issued',
                  project: 'Coral Reef Restoration',
                  time: '4 hours ago',
                  status: 'success'
                },
                {
                  action: 'New Project Submitted',
                  project: 'Urban Forest Project',
                  time: '6 hours ago',
                  status: 'pending'
                },
                {
                  action: 'Verification Required',
                  project: 'Wetland Research Study',
                  time: '8 hours ago',
                  status: 'warning'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-success' :
                    activity.status === 'warning' ? 'bg-warning' :
                    'bg-muted-foreground'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {activity.project}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Blockchain Transactions */}
          <div className="xl:col-span-2">
            <TransactionTable 
              transactions={mockTransactions}
            />
          </div>
        </div>
      </main>
    </div>
  );
}