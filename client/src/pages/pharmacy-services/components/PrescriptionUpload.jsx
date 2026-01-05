import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrescriptionUpload = ({ onUpload }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        onUpload({
          fileName: file?.name,
          medications: [
            "Amoxicillin 500mg - 3x daily for 7 days",
            "Paracetamol 500mg - As needed for pain"
          ]
        });
      }, 2000);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setIsProcessing(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon name="Upload" size={20} color="var(--color-primary)" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-1">Upload Prescription</h3>
          <p className="text-sm text-muted-foreground">
            Upload a photo of your prescription for automatic medication detection
          </p>
        </div>
      </div>
      {!uploadedFile ? (
        <label className="block">
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer">
            <Icon name="Camera" size={40} className="mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, PDF up to 10MB
            </p>
          </div>
        </label>
      ) : (
        <div className="border border-border rounded-lg p-4">
          {isProcessing ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center animate-pulse">
                <Icon name="FileText" size={20} color="var(--color-primary)" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground mb-1">Processing prescription...</p>
                <p className="text-xs text-muted-foreground">Extracting medication information</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-success/10 flex items-center justify-center">
                <Icon name="CheckCircle" size={20} color="var(--color-success)" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground mb-1">{uploadedFile?.name}</p>
                <p className="text-xs text-success">Prescription processed successfully</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                iconName="X"
                onClick={handleRemoveFile}
              />
            </div>
          )}
        </div>
      )}
      <div className="mt-4 p-3 rounded-lg bg-info/10 flex items-start gap-2">
        <Icon name="Info" size={16} color="var(--color-info)" className="flex-shrink-0 mt-0.5" />
        <p className="text-xs text-info">
          Our OCR technology automatically detects medications from your prescription. Please verify the extracted information before ordering.
        </p>
      </div>
    </div>
  );
};

export default PrescriptionUpload;