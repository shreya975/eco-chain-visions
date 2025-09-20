import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Building, 
  Microscope, 
  Users, 
  ShoppingCart,
  Leaf,
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';

type UserRole = 'govt' | 'ngo' | 'scientist' | 'community' | 'buyer';

interface RoleConfig {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  permissions: string[];
}

const roleConfigs: Record<UserRole, RoleConfig> = {
  govt: {
    icon: Shield,
    title: 'Government',
    description: 'Regulatory oversight and policy implementation',
    color: 'text-primary',
    bgColor: 'bg-gradient-earth',
    permissions: ['Project Approval', 'Policy Setting', 'Compliance Monitoring', 'Data Access']
  },
  ngo: {
    icon: Building,
    title: 'NGO',
    description: 'Non-profit environmental organization',
    color: 'text-secondary',
    bgColor: 'bg-gradient-ocean',
    permissions: ['Project Management', 'Community Engagement', 'Funding', 'Reporting']
  },
  scientist: {
    icon: Microscope,
    title: 'Scientist',
    description: 'Research and environmental data analysis',
    color: 'text-accent',
    bgColor: 'bg-gradient-forest',
    permissions: ['Data Collection', 'Research Analysis', 'Verification', 'Publication']
  },
  community: {
    icon: Users,
    title: 'Community',
    description: 'Local community representative',
    color: 'text-success',
    bgColor: 'bg-gradient-earth',
    permissions: ['Local Monitoring', 'Reporting', 'Participation', 'Benefits']
  },
  buyer: {
    icon: ShoppingCart,
    title: 'Buyer',
    description: 'Carbon credit and environmental asset purchaser',
    color: 'text-warning',
    bgColor: 'bg-gradient-ocean',
    permissions: ['Purchase Credits', 'Portfolio Management', 'Verification', 'Trading']
  }
};

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      localStorage.setItem('userRole', selectedRole);
      localStorage.setItem('userName', email.split('@')[0]);
      navigate('/dashboard');
    }, 1500);
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-forest flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-earth flex items-center justify-center shadow-green">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">EcoTracker</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Blockchain-powered environmental project management
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Select your role to access the platform
            </p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(Object.entries(roleConfigs) as [UserRole, RoleConfig][]).map(([role, config]) => {
              const Icon = config.icon;
              
              return (
                <Card
                  key={role}
                  className="cursor-pointer transition-all hover:shadow-green hover:scale-105 group"
                  onClick={() => setSelectedRole(role)}
                >
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 rounded-lg ${config.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-soft`}>
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    
                    <CardTitle className="text-lg flex items-center justify-between">
                      {config.title}
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {config.description}
                    </p>
                    
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-foreground">Key Permissions:</p>
                      <div className="flex flex-wrap gap-1">
                        {config.permissions.slice(0, 2).map((permission) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                        {config.permissions.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{config.permissions.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Need help choosing? <a href="#" className="text-primary hover:underline">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const config = roleConfigs[selectedRole];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-gradient-forest flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-green">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-earth flex items-center justify-center shadow-soft">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">EcoTracker</h1>
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <div className={`p-2 rounded-lg ${config.bgColor}`}>
              <Icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <CardTitle className="text-lg">
              {config.title} Login
            </CardTitle>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {config.description}
          </p>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSelectedRole(null)}
            className="text-xs"
          >
            Change Role
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className={`w-full ${config.bgColor} text-primary-foreground`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : `Sign in as ${config.title}`}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-xs text-muted-foreground">
                <a href="#" className="hover:underline">Forgot password?</a>
              </p>
              <p className="text-xs text-muted-foreground">
                New to EcoTracker? <a href="#" className="text-primary hover:underline">Request access</a>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}