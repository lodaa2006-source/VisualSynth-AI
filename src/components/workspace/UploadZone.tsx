import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UploadZoneProps {
  label: string;
  image: string | null;
  onUpload: (base64: string) => void;
  onClear: () => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ label, image, onUpload, onClear }) => {
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
    multiple: false
  } as any);

  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div 
        {...getRootProps()} 
        className={`relative aspect-video rounded-xl border-2 border-dashed transition-all duration-300 overflow-hidden
          ${image ? 'border-transparent' : 'border-white/10 hover:border-violet-500/50 bg-white/5'}
          ${isDragActive ? 'border-violet-500 bg-violet-500/10' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <AnimatePresence mode="wait">
          {image ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full h-full group"
            >
              <img src={image} alt="Upload" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); onClear(); }}
                  className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
              <div className="p-3 rounded-full bg-white/5">
                <Upload size={24} />
              </div>
              <div className="text-center px-4">
                <p className="text-sm font-medium">Click or drag image</p>
                <p className="text-xs opacity-60">PNG, JPG up to 10MB</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
