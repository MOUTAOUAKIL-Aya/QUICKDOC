import React from 'react';
import Icon from '../../../components/AppIcon';

const ComplianceTimeline = ({ milestones }) => {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
      <div className="space-y-8">
        {milestones?.map((milestone, index) => (
          <div key={milestone?.id} className="relative pl-12">
            <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
              milestone?.status === 'completed' ? 'bg-success' : 
              milestone?.status === 'in-progress' ? 'bg-primary' : 'bg-muted'
            }`}>
              <Icon 
                name={milestone?.status === 'completed' ? 'Check' : milestone?.status === 'in-progress' ? 'Clock' : 'Circle'} 
                size={16} 
                color="white" 
              />
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-base font-semibold text-foreground">{milestone?.title}</h4>
                <span className="text-xs text-muted-foreground">{milestone?.date}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{milestone?.description}</p>
              {milestone?.documents && milestone?.documents?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {milestone?.documents?.map((doc, idx) => (
                    <button
                      key={idx}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-muted hover:bg-primary/10 text-xs font-medium text-foreground transition-colors"
                    >
                      <Icon name="FileText" size={14} />
                      <span>{doc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceTimeline;