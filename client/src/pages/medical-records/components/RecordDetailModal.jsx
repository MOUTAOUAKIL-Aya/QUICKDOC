import React from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecordDetailModal = ({ record, onClose, onShare, onDownload }) => {
  const getRecordIcon = (type) => {
    const icons = {
      prescription: 'Pill',
      lab: 'FlaskConical',
      vaccination: 'Syringe',
      consultation: 'Stethoscope',
      imaging: 'ScanLine',
      document: 'FileText'
    };
    return icons?.[type] || 'FileText';
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name={getRecordIcon(record?.type)} size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{record?.title}</h2>
              <p className="text-sm text-muted-foreground">{record?.category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md hover:bg-muted flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <Icon name="Calendar" size={20} color="var(--color-primary)" />
              <div>
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="text-sm font-medium text-foreground">{record?.date}</p>
              </div>
            </div>

            {record?.provider && (
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <Icon name="Building2" size={20} color="var(--color-primary)" />
                <div>
                  <p className="text-xs text-muted-foreground">Provider</p>
                  <p className="text-sm font-medium text-foreground">{record?.provider}</p>
                </div>
              </div>
            )}
          </div>

          {record?.description && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{record?.description}</p>
            </div>
          )}

          {record?.details && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Details</h3>
              <div className="space-y-2">
                {Object.entries(record?.details)?.map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-muted-foreground capitalize">{key?.replace(/_/g, ' ')}</span>
                    <span className="text-sm font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {record?.tags && record?.tags?.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {record?.tags?.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {record?.attachments && record?.attachments?.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Attachments</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {record?.attachments?.map((attachment, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="FileText" size={20} color="var(--color-primary)" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{attachment?.name}</p>
                      <p className="text-xs text-muted-foreground">{attachment?.size}</p>
                    </div>
                    <Button variant="ghost" size="sm" iconName="Download">
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex gap-3">
              <Icon name="Lock" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Secure & Encrypted</p>
                <p className="text-xs text-muted-foreground">
                  This record is encrypted and stored securely. All access is logged and monitored for your protection.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={() => onShare(record)} iconName="Share2" iconPosition="left">
            Share
          </Button>
          <Button variant="outline" onClick={() => onDownload(record)} iconName="Download" iconPosition="left">
            Download
          </Button>
          <Button variant="default" onClick={onClose} fullWidth>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecordDetailModal;