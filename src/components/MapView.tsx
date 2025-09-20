import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Satellite, 
  Camera, 
  Layers, 
  Maximize2,
  Filter,
  Search,
  Plus
} from 'lucide-react';

interface ProjectMarker {
  id: string;
  name: string;
  type: 'reforestation' | 'conservation' | 'cleanup' | 'research';
  lat: number;
  lng: number;
  status: 'active' | 'completed' | 'planned';
  metrics: {
    co2: number;
    area: number;
    biodiversity: number;
  };
}

interface MapViewProps {
  projects: ProjectMarker[];
  className?: string;
}

const projectTypeColors = {
  reforestation: 'bg-success text-success-foreground',
  conservation: 'bg-accent text-accent-foreground',
  cleanup: 'bg-secondary text-secondary-foreground',
  research: 'bg-primary text-primary-foreground',
};

const statusColors = {
  active: 'bg-success text-success-foreground',
  completed: 'bg-muted text-muted-foreground',
  planned: 'bg-warning text-warning-foreground',
};

export function MapView({ projects, className }: MapViewProps) {
  const [overlayMode, setOverlayMode] = useState<'satellite' | 'drone' | 'none'>('none');
  const [selectedProject, setSelectedProject] = useState<ProjectMarker | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <Card className={`shadow-soft ${className}`}>
      <CardContent className="p-0">
        {/* Map Controls Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-forest">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-foreground" />
            <h3 className="font-semibold text-foreground">Project Map</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Overlay Controls */}
        <div className="flex items-center gap-2 p-3 bg-muted border-b">
          <Layers className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground mr-2">Overlay:</span>
          
          <Button
            variant={overlayMode === 'satellite' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setOverlayMode(overlayMode === 'satellite' ? 'none' : 'satellite')}
            className="h-8"
          >
            <Satellite className="h-3 w-3 mr-1" />
            Satellite
          </Button>
          
          <Button
            variant={overlayMode === 'drone' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setOverlayMode(overlayMode === 'drone' ? 'none' : 'drone')}
            className="h-8"
          >
            <Camera className="h-3 w-3 mr-1" />
            Drone
          </Button>
        </div>

        {/* Mock Map Area */}
        <div className="relative h-80 bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden">
          {/* Background pattern to simulate map */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 400 320">
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Project Markers */}
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 ${
                selectedProject?.id === project.id ? 'z-10' : 'z-0'
              }`}
              style={{
                left: `${20 + (index * 15)}%`,
                top: `${30 + (index * 10)}%`,
              }}
              onClick={() => setSelectedProject(selectedProject?.id === project.id ? null : project)}
            >
              <div className="relative">
                <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${projectTypeColors[project.type]}`}>
                  <MapPin className="h-4 w-4" />
                </div>
                
                {selectedProject?.id === project.id && (
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-card border rounded-lg shadow-lg p-3 w-64 z-20">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">{project.name}</h4>
                        <Badge className={statusColors[project.status]} variant="secondary">
                          {project.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <p className="font-medium text-success">{project.metrics.co2}t</p>
                          <p className="text-muted-foreground">CO₂</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-secondary">{project.metrics.area}ha</p>
                          <p className="text-muted-foreground">Area</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-accent">{project.metrics.biodiversity}</p>
                          <p className="text-muted-foreground">Bio Index</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Overlay indicators */}
          {overlayMode !== 'none' && (
            <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
              {overlayMode === 'satellite' ? '🛰️ Satellite View' : '🚁 Drone Footage'}
            </div>
          )}
        </div>

        {/* Add Project Button */}
        <div className="p-4 border-t">
          <Button className="w-full bg-gradient-earth text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Add New Project
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}