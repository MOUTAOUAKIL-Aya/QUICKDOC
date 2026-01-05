import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const UploadDocumentModal = ({ onClose, onUpload }) => {
  const [uploadData, setUploadData] = useState({
    title: '',
    category: '',
    type: '',
    date: '',
    provider: '',
    notes: '',
    file: null
  });

  const categoryOptions = [
    { value: 'prescription', label: 'Prescription' },
    { value: 'lab', label: 'Lab Results' },
    { value: 'vaccination', label: 'Vaccination Record' },
    { value: 'consultation', label: 'Consultation Notes' },
    { value: 'imaging', label: 'Medical Imaging' },
    { value: 'document', label: 'Other Document' }
  ];

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setUploadData({ ...uploadData, file });
    }
  };

  const handleUpload = () => {
    onUpload(uploadData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Upload Medical Document</h2>
            <p className="text-sm text-muted-foreground mt-1">Add a new record to your health timeline</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md hover:bg-muted flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Upload" size={32} color="var(--color-primary)" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">
                {uploadData?.file ? uploadData?.file?.name : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, JPG, PNG, DOC up to 10MB
              </p>
            </label>
          </div>

          <Input
            label="Document Title"
            type="text"
            placeholder="e.g., Blood Test Results"
            value={uploadData?.title}
            onChange={(e) => setUploadData({ ...uploadData, title: e?.target?.value })}
            required
          />

          <Select
            label="Category"
            options={categoryOptions}
            value={uploadData?.category}
            onChange={(value) => setUploadData({ ...uploadData, category: value })}
            placeholder="Select category"
            required
          />

          <Input
            label="Document Date"
            type="date"
            value={uploadData?.date}
            onChange={(e) => setUploadData({ ...uploadData, date: e?.target?.value })}
            required
          />

          <Input
            label="Healthcare Provider"
            type="text"
            placeholder="e.g., Dr. Ahmed Hassan"
            value={uploadData?.provider}
            onChange={(e) => setUploadData({ ...uploadData, provider: e?.target?.value })}
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Notes (Optional)</label>
            <textarea
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
              rows="3"
              placeholder="Add any additional notes..."
              value={uploadData?.notes}
              onChange={(e) => setUploadData({ ...uploadData, notes: e?.target?.value })}
            />
          </div>

          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex gap-3">
              <Icon name="Info" size={20} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">OCR Processing</p>
                <p className="text-xs text-muted-foreground">
                  Documents will be automatically scanned and text will be extracted for easy searching and analysis.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button 
            variant="default" 
            onClick={handleUpload} 
            fullWidth
            iconName="Upload"
            iconPosition="left"
            disabled={!uploadData?.file || !uploadData?.title || !uploadData?.category || !uploadData?.date}
          >
            Upload Document
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentModal;