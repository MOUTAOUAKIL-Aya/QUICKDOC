import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentDownloadCard = ({ document }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon name="FileText" size={24} color="var(--color-primary)" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-semibold text-foreground mb-1 truncate">{document?.title}</h4>
          <p className="text-sm text-muted-foreground mb-3">{document?.description}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Icon name="Calendar" size={12} />
              <span>Updated: {document?.lastUpdated}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="FileType" size={12} />
              <span>{document?.format}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="HardDrive" size={12} />
              <span>{document?.size}</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            iconName="Download" 
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentDownloadCard;