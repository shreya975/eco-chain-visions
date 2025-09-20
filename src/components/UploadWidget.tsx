import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Image, 
  Video, 
  FileText, 
  X, 
  Check,
  Camera,
  Smartphone
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  size: number;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  url?: string;
}

interface UploadWidgetProps {
  onFilesUploaded?: (files: UploadedFile[]) => void;
  acceptedTypes?: string[];
  maxSize?: number; // in MB
  className?: string;
}

export function UploadWidget({ 
  onFilesUploaded, 
  acceptedTypes = ['image/*', 'video/*', '.pdf', '.doc', '.docx'],
  maxSize = 100,
  className 
}: UploadWidgetProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image;
    if (type.startsWith('video/')) return Video;
    return FileText;
  };

  const getFileTypeColor = (type: string) => {
    if (type.startsWith('image/')) return 'bg-success text-success-foreground';
    if (type.startsWith('video/')) return 'bg-secondary text-secondary-foreground';
    return 'bg-accent text-accent-foreground';
  };

  const simulateUpload = (file: File): UploadedFile => {
    const uploadFile: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 
            file.type.startsWith('video/') ? 'video' : 'document',
      size: file.size,
      progress: 0,
      status: 'uploading'
    };

    // Simulate upload progress
    const interval = setInterval(() => {
      setFiles(prev => prev.map(f => {
        if (f.id === uploadFile.id && f.progress < 100) {
          const newProgress = Math.min(f.progress + Math.random() * 20, 100);
          return {
            ...f,
            progress: newProgress,
            status: newProgress === 100 ? 'completed' : 'uploading'
          };
        }
        return f;
      }));
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setFiles(prev => prev.map(f => 
        f.id === uploadFile.id 
          ? { ...f, progress: 100, status: 'completed', url: URL.createObjectURL(file) }
          : f
      ));
    }, 3000);

    return uploadFile;
  };

  const handleFiles = useCallback((fileList: FileList) => {
    const newFiles: UploadedFile[] = [];
    
    Array.from(fileList).forEach(file => {
      if (file.size > maxSize * 1024 * 1024) {
        // Handle file too large
        return;
      }
      
      const uploadFile = simulateUpload(file);
      newFiles.push(uploadFile);
    });

    setFiles(prev => [...prev, ...newFiles]);
    onFilesUploaded?.(newFiles);
  }, [maxSize, onFilesUploaded]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <Card className={`shadow-soft ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Upload className="h-5 w-5" />
          Upload Project Files
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-gradient-earth">
                <Upload className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Drop files here or click to upload
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Images, videos, documents up to {maxSize}MB
              </p>
            </div>

            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="sm">
                <Camera className="h-4 w-4 mr-2" />
                Camera
              </Button>
              <Button variant="outline" size="sm">
                <Smartphone className="h-4 w-4 mr-2" />
                Gallery
              </Button>
            </div>

            <input
              type="file"
              multiple
              accept={acceptedTypes.join(',')}
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="default" asChild className="cursor-pointer">
                <span>Browse Files</span>
              </Button>
            </label>
          </div>
        </div>

        {/* Uploaded Files List */}
        {files.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Uploaded Files</h4>
            
            {files.map((file) => {
              const FileIcon = getFileIcon(file.name);
              
              return (
                <div key={file.id} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                  <div className={`p-2 rounded ${getFileTypeColor(file.type)}`}>
                    <FileIcon className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </span>
                      
                      {file.status === 'completed' ? (
                        <Badge className="bg-success text-success-foreground" variant="secondary">
                          <Check className="h-3 w-3 mr-1" />
                          Complete
                        </Badge>
                      ) : file.status === 'uploading' ? (
                        <div className="flex items-center gap-2">
                          <Progress value={file.progress} className="h-1 w-16" />
                          <span className="text-xs text-muted-foreground">
                            {Math.round(file.progress)}%
                          </span>
                        </div>
                      ) : (
                        <Badge variant="destructive">Error</Badge>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}