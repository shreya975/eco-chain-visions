import { useState } from 'react';
import { Header } from '@/components/Header';
import { UploadWidget } from '@/components/UploadWidget';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Leaf, 
  FileText, 
  Camera, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Globe,
  Droplets,
  Wind,
  Activity
} from 'lucide-react';

interface ProjectFormData {
  name: string;
  description: string;
  ecosystem: string;
  location: {
    lat: string;
    lng: string;
    address: string;
  };
  area: string;
  baseline: {
    co2: string;
    biodiversity: string;
    soilHealth: string;
    waterQuality: string;
  };
  timeline: {
    startDate: string;
    endDate: string;
    duration: string;
  };
  budget: string;
  objectives: string;
}

const ecosystemTypes = [
  { value: 'forest', label: 'Forest', icon: '🌲' },
  { value: 'wetland', label: 'Wetland', icon: '🌾' },
  { value: 'grassland', label: 'Grassland', icon: '🌱' },
  { value: 'coastal', label: 'Coastal', icon: '🏖️' },
  { value: 'marine', label: 'Marine', icon: '🌊' },
  { value: 'urban', label: 'Urban', icon: '🏙️' },
  { value: 'agricultural', label: 'Agricultural', icon: '🚜' },
  { value: 'desert', label: 'Desert', icon: '🏜️' }
];

export default function ProjectRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    ecosystem: '',
    location: { lat: '', lng: '', address: '' },
    area: '',
    baseline: { co2: '', biodiversity: '', soilHealth: '', waterQuality: '' },
    timeline: { startDate: '', endDate: '', duration: '' },
    budget: '',
    objectives: ''
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedFormData = (parent: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof ProjectFormData] as any,
        [field]: value
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Submitting project:', formData);
    // Here you would submit to your backend/blockchain
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="govt" userName="Admin" notifications={3} />
      
      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Register New Environmental Project
          </h1>
          <p className="text-muted-foreground">
            Create a blockchain-verified environmental project with comprehensive tracking
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Registration Progress</h3>
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            
            <Progress value={progress} className="h-2 mb-4" />
            
            <div className="grid grid-cols-4 gap-4">
              {[
                { step: 1, title: 'Project Details', icon: FileText },
                { step: 2, title: 'Location & Ecosystem', icon: MapPin },
                { step: 3, title: 'Baseline Data', icon: Activity },
                { step: 4, title: 'Documentation', icon: Camera }
              ].map(({ step, title, icon: Icon }) => (
                <div key={step} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep > step ? 'bg-success text-success-foreground' :
                    currentStep === step ? 'bg-primary text-primary-foreground' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {currentStep > step ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </div>
                  <span className={`text-sm ${
                    currentStep >= step ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {title}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {currentStep === 1 && <FileText className="h-5 w-5" />}
                  {currentStep === 2 && <MapPin className="h-5 w-5" />}
                  {currentStep === 3 && <Activity className="h-5 w-5" />}
                  {currentStep === 4 && <Camera className="h-5 w-5" />}
                  
                  {currentStep === 1 && 'Project Information'}
                  {currentStep === 2 && 'Location & Ecosystem'}
                  {currentStep === 3 && 'Environmental Baseline'}
                  {currentStep === 4 && 'Documentation & Media'}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Step 1: Project Details */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Project Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter project name"
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Project Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the environmental project, its goals, and expected impact"
                        value={formData.description}
                        onChange={(e) => updateFormData('description', e.target.value)}
                        rows={4}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="budget">Total Budget (USD)</Label>
                        <Input
                          id="budget"
                          type="number"
                          placeholder="0"
                          value={formData.budget}
                          onChange={(e) => updateFormData('budget', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="area">Project Area (hectares)</Label>
                        <Input
                          id="area"
                          type="number"
                          placeholder="0"
                          value={formData.area}
                          onChange={(e) => updateFormData('area', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="objectives">Key Objectives</Label>
                      <Textarea
                        id="objectives"
                        placeholder="List the main environmental objectives and measurable outcomes"
                        value={formData.objectives}
                        onChange={(e) => updateFormData('objectives', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Location & Ecosystem */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <Label>Ecosystem Type</Label>
                      <Select value={formData.ecosystem} onValueChange={(value) => updateFormData('ecosystem', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select ecosystem type" />
                        </SelectTrigger>
                        <SelectContent>
                          {ecosystemTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <span className="flex items-center gap-2">
                                <span>{type.icon}</span>
                                {type.label}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Project Address</Label>
                      <Input
                        id="address"
                        placeholder="Enter full address or nearest landmark"
                        value={formData.location.address}
                        onChange={(e) => updateNestedFormData('location', 'address', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="latitude">Latitude</Label>
                        <Input
                          id="latitude"
                          placeholder="e.g., -3.4653"
                          value={formData.location.lat}
                          onChange={(e) => updateNestedFormData('location', 'lat', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="longitude">Longitude</Label>
                        <Input
                          id="longitude"
                          placeholder="e.g., -62.2159"
                          value={formData.location.lng}
                          onChange={(e) => updateNestedFormData('location', 'lng', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Location Picker</span>
                      </div>
                      <div className="h-40 bg-gradient-to-br from-green-50 to-blue-50 rounded border flex items-center justify-center">
                        <p className="text-sm text-muted-foreground">Interactive map would be here</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Baseline Data */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <p className="text-sm text-muted-foreground">
                      Provide baseline environmental measurements for tracking project impact.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Leaf className="h-4 w-4 text-success" />
                          <h4 className="font-medium">Carbon & Vegetation</h4>
                        </div>
                        
                        <div>
                          <Label htmlFor="co2">Current CO₂ Levels (ppm)</Label>
                          <Input
                            id="co2"
                            type="number"
                            placeholder="e.g., 415"
                            value={formData.baseline.co2}
                            onChange={(e) => updateNestedFormData('baseline', 'co2', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="biodiversity">Biodiversity Index (0-100)</Label>
                          <Input
                            id="biodiversity"
                            type="number"
                            placeholder="e.g., 75"
                            value={formData.baseline.biodiversity}
                            onChange={(e) => updateNestedFormData('baseline', 'biodiversity', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Droplets className="h-4 w-4 text-secondary" />
                          <h4 className="font-medium">Soil & Water</h4>
                        </div>
                        
                        <div>
                          <Label htmlFor="soil">Soil Health Score (0-100)</Label>
                          <Input
                            id="soil"
                            type="number"
                            placeholder="e.g., 68"
                            value={formData.baseline.soilHealth}
                            onChange={(e) => updateNestedFormData('baseline', 'soilHealth', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="water">Water Quality Index (0-100)</Label>
                          <Input
                            id="water"
                            type="number"
                            placeholder="e.g., 82"
                            value={formData.baseline.waterQuality}
                            onChange={(e) => updateNestedFormData('baseline', 'waterQuality', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="startDate">Project Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.timeline.startDate}
                          onChange={(e) => updateNestedFormData('timeline', 'startDate', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="endDate">Estimated End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.timeline.endDate}
                          onChange={(e) => updateNestedFormData('timeline', 'endDate', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="duration">Duration (months)</Label>
                        <Input
                          id="duration"
                          type="number"
                          placeholder="e.g., 24"
                          value={formData.timeline.duration}
                          onChange={(e) => updateNestedFormData('timeline', 'duration', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Documentation */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <p className="text-sm text-muted-foreground">
                      Upload project documentation, images, and drone footage for verification.
                    </p>
                    
                    <UploadWidget 
                      acceptedTypes={['image/*', 'video/*', '.pdf', '.doc', '.docx']}
                      maxSize={100}
                    />
                    
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Required Documentation</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Environmental impact assessment</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-muted-foreground" />
                          <span>Site photographs (before state)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-muted-foreground" />
                          <span>Drone aerial footage (optional)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-muted-foreground" />
                          <span>Permits and certifications</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Summary */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Project Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-sm text-muted-foreground">Name:</span>
                  <p className="font-medium text-foreground">
                    {formData.name || 'Not specified'}
                  </p>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground">Ecosystem:</span>
                  <p className="font-medium text-foreground">
                    {formData.ecosystem ? 
                      ecosystemTypes.find(e => e.value === formData.ecosystem)?.label : 
                      'Not selected'
                    }
                  </p>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground">Area:</span>
                  <p className="font-medium text-foreground">
                    {formData.area ? `${formData.area} hectares` : 'Not specified'}
                  </p>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground">Budget:</span>
                  <p className="font-medium text-foreground">
                    {formData.budget ? `$${Number(formData.budget).toLocaleString()}` : 'Not specified'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Info */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Blockchain Registration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Your project will be registered on the blockchain for transparency and immutability.
                </p>
                
                <div className="space-y-2">
                  <Badge variant="outline" className="w-full justify-center">
                    🔗 Ethereum Mainnet
                  </Badge>
                  <Badge variant="outline" className="w-full justify-center">
                    ⛽ Est. Gas: 0.05 ETH
                  </Badge>
                  <Badge variant="outline" className="w-full justify-center">
                    🎫 NFT Certificate Included
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < totalSteps ? (
            <Button onClick={nextStep} className="bg-gradient-earth text-primary-foreground">
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-gradient-earth text-primary-foreground">
              <CheckCircle className="h-4 w-4 mr-2" />
              Register Project
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}