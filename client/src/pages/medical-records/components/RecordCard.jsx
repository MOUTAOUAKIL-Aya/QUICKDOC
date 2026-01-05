import React from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecordCard = ({ record, onView, onShare, onDownload }) => {
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

  const getRecordColor = (type) => {
    const colors = {
      prescription: 'text-primary bg-primary/10',
      lab: 'text-secondary bg-secondary/10',
      vaccination: 'text-success bg-success/10',
      consultation: 'text-accent bg-accent/10',
      imaging: 'text-info bg-info/10',
      document: 'text-muted-foreground bg-muted'
    };
    return colors?.[type] || 'text-muted-foreground bg-muted';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getRecordColor(record?.type)}`}>
          <Icon name={getRecordIcon(record?.type)} size={24} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-foreground mb-1 truncate">{record?.title}</h3>
              <p className="text-sm text-muted-foreground">{record?.category}</p>
            </div>
            {record?.isNew && (
              <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-md flex-shrink-0">
                New
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Icon name="Calendar" size={14} />
              <span>{record?.date}</span>
            </div>
            {record?.provider && (
              <div className="flex items-center gap-1">
                <Icon name="Building2" size={14} />
                <span>{record?.provider}</span>
              </div>
            )}
          </div>

          {record?.tags && record?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {record?.tags?.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onView(record)} iconName="Eye" iconPosition="left">
              View
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onShare(record)} iconName="Share2" iconPosition="left">
              Share
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDownload(record)} iconName="Download" iconPosition="left">
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordCard;