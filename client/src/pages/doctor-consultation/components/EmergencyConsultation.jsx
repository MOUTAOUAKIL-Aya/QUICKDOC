import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyConsultation = ({ onRequestEmergency }) => {
  return (
    <div className="bg-gradient-to-r from-destructive/10 to-warning/10 border-2 border-destructive/20 rounded-lg p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="AlertCircle" size={32} color="var(--color-destructive)" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">Need Urgent Medical Attention?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Connect with an available doctor immediately for emergency consultations. Available 24/7 for critical health concerns.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="destructive"
              iconName="Phone"
              iconPosition="left"
              onClick={onRequestEmergency}
            >
              Request Emergency Call
            </Button>
            <Button
              variant="outline"
              iconName="MessageSquare"
              iconPosition="left"
            >
              Emergency Chat
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>Response time: &lt;5 minutes</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Shield" size={16} />
            <span>Premium service included</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyConsultation;