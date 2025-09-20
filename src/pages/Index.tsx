import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  Shield, 
  Globe, 
  TrendingUp, 
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-forest">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-16 w-16 rounded-2xl bg-gradient-earth flex items-center justify-center shadow-green">
              <Leaf className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold text-foreground">EcoTracker</h1>
          </div>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Blockchain-powered environmental project management platform for transparent, 
            verifiable impact tracking and carbon credit management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-earth text-primary-foreground shadow-green"
              onClick={() => navigate('/login')}
            >
              Get Started
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/dashboard')}
            >
              View Demo Dashboard
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: Shield,
              title: 'Role-Based Access',
              description: 'Secure access for Government, NGOs, Scientists, Communities, and Buyers'
            },
            {
              icon: Globe,
              title: 'Global Mapping',
              description: 'Interactive maps with satellite overlays and geo-tagged project markers'
            },
            {
              icon: TrendingUp,
              title: 'Live Metrics',
              description: 'Real-time tracking of CO₂ sequestration, biodiversity, and health scores'
            },
            {
              icon: Users,
              title: 'Blockchain Verified',
              description: 'Immutable transaction logs and transparent verification processes'
            }
          ].map((feature, index) => (
            <Card key={index} className="shadow-soft hover:shadow-green transition-all hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-earth rounded-lg p-3 inline-flex mb-4 shadow-soft">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-card rounded-2xl p-8 shadow-soft mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Environmental Impact Dashboard
            </h2>
            <p className="text-muted-foreground">
              Track real environmental outcomes with blockchain verification
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: '2,847', unit: 'tons CO₂', label: 'Carbon Sequestered', change: '+12.5%' },
              { value: '156', unit: 'projects', label: 'Active Projects', change: '+8.1%' },
              { value: '87.2', unit: 'score', label: 'Avg Biodiversity', change: '+5.8%' },
              { value: '94.6', unit: '%', label: 'Health Score', change: '+2.3%' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                  <span className="text-lg text-muted-foreground ml-1">{stat.unit}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                <Badge className="bg-success/10 text-success" variant="secondary">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* User Types */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Built for Every Stakeholder
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { role: 'Government', icon: '🏛️', color: 'bg-primary' },
              { role: 'NGO', icon: '🏢', color: 'bg-secondary' },
              { role: 'Scientist', icon: '🔬', color: 'bg-accent' },
              { role: 'Community', icon: '👥', color: 'bg-success' },
              { role: 'Buyer', icon: '🛒', color: 'bg-warning' }
            ].map((user, index) => (
              <Card key={index} className="shadow-soft hover:shadow-green transition-all">
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 rounded-full ${user.color} flex items-center justify-center mx-auto mb-3 text-white`}>
                    <span className="text-xl">{user.icon}</span>
                  </div>
                  <h3 className="font-semibold text-foreground">{user.role}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-earth rounded-2xl p-8 text-center shadow-green">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Track Environmental Impact?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            Join the next generation of environmental project management with 
            blockchain transparency and real-time verification.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/login')}
            >
              Start Your Project
              <CheckCircle className="h-5 w-5 ml-2" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => navigate('/register-project')}
            >
              Register Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
