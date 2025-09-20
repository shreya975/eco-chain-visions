import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  Settings, 
  Bell, 
  User, 
  Shield, 
  Building, 
  Microscope, 
  Users, 
  ShoppingCart 
} from 'lucide-react';

type UserRole = 'govt' | 'ngo' | 'scientist' | 'community' | 'buyer';

interface HeaderProps {
  userRole: UserRole;
  userName: string;
  notifications?: number;
}

const roleConfig = {
  govt: { 
    icon: Shield, 
    label: 'Government', 
    color: 'bg-gradient-earth text-primary-foreground',
    badgeColor: 'bg-primary text-primary-foreground'
  },
  ngo: { 
    icon: Building, 
    label: 'NGO', 
    color: 'bg-gradient-ocean text-secondary-foreground',
    badgeColor: 'bg-secondary text-secondary-foreground'
  },
  scientist: { 
    icon: Microscope, 
    label: 'Scientist', 
    color: 'bg-gradient-forest text-accent-foreground',
    badgeColor: 'bg-accent text-accent-foreground'
  },
  community: { 
    icon: Users, 
    label: 'Community', 
    color: 'bg-gradient-earth text-primary-foreground',
    badgeColor: 'bg-success text-success-foreground'
  },
  buyer: { 
    icon: ShoppingCart, 
    label: 'Buyer', 
    color: 'bg-gradient-ocean text-secondary-foreground',
    badgeColor: 'bg-warning text-warning-foreground'
  }
};

export function Header({ userRole, userName, notifications = 0 }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const config = roleConfig[userRole];
  const RoleIcon = config.icon;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-soft">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Left: Menu & Logo */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="h-9 w-9 p-0"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-earth flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">🌱</span>
            </div>
            <h1 className="text-lg font-semibold tracking-tight">EcoTracker</h1>
          </div>
        </div>

        {/* Right: Role Badge, Notifications & Profile */}
        <div className="flex items-center gap-3">
          {/* Role Badge */}
          <Badge className={config.badgeColor}>
            <RoleIcon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs p-0 flex items-center justify-center">
                {notifications > 9 ? '9+' : notifications}
              </Badge>
            )}
          </Button>

          {/* Profile Avatar */}
          <Avatar className="h-8 w-8">
            <AvatarImage src="/api/placeholder/32/32" alt={userName} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-card border-b shadow-lg p-4 md:hidden">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Projects
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Map View
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Blockchain Log
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Settings
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}