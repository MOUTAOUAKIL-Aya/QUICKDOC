import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ShareRecordModal = ({ record, onClose, onShare }) => {
  const [shareData, setShareData] = useState({
    recipientEmail: '',
    accessLevel: 'view',
    expiryDays: '7',
    includeHistory: false,
    notifyRecipient: true
  });

  const accessLevelOptions = [
    { value: 'view', label: 'View Only' },
    { value: 'download', label: 'View & Download' },
    { value: 'edit', label: 'View, Download & Edit' }
  ];

  const expiryOptions = [
    { value: '1', label: '1 Day' },
    { value: '7', label: '7 Days' },
    { value: '30', label: '30 Days' },
    { value: '90', label: '90 Days' },
    { value: 'never', label: 'Never Expires' }
  ];

  const handleShare = () => {
    onShare({ ...shareData, recordId: record?.id });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Share Medical Record</h2>
            <p className="text-sm text-muted-foreground mt-1">{record?.title}</p>
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
          <Input
            label="Recipient Email"
            type="email"
            placeholder="doctor@example.com"
            value={shareData?.recipientEmail}
            onChange={(e) => setShareData({ ...shareData, recipientEmail: e?.target?.value })}
            required
          />

          <Select
            label="Access Level"
            options={accessLevelOptions}
            value={shareData?.accessLevel}
            onChange={(value) => setShareData({ ...shareData, accessLevel: value })}
          />

          <Select
            label="Access Expiry"
            options={expiryOptions}
            value={shareData?.expiryDays}
            onChange={(value) => setShareData({ ...shareData, expiryDays: value })}
          />

          <Checkbox
            label="Include medical history"
            description="Share related medical records and history"
            checked={shareData?.includeHistory}
            onChange={(e) => setShareData({ ...shareData, includeHistory: e?.target?.checked })}
          />

          <Checkbox
            label="Notify recipient via email"
            checked={shareData?.notifyRecipient}
            onChange={(e) => setShareData({ ...shareData, notifyRecipient: e?.target?.checked })}
          />

          <div className="bg-info/10 border border-info/20 rounded-lg p-4">
            <div className="flex gap-3">
              <Icon name="Shield" size={20} color="var(--color-info)" className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Secure Sharing</p>
                <p className="text-xs text-muted-foreground">
                  All shared records are encrypted and access is logged for your security. You can revoke access at any time.
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
            onClick={handleShare} 
            fullWidth
            iconName="Share2"
            iconPosition="left"
            disabled={!shareData?.recipientEmail}
          >
            Share Record
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareRecordModal;