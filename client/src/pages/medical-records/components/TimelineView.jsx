import React from 'react';
import Icon from '../../../components/AppIcon';

const TimelineView = ({ records }) => {
  const groupedRecords = records?.reduce((acc, record) => {
    const year = new Date(record.timestamp)?.getFullYear();
    if (!acc?.[year]) acc[year] = [];
    acc?.[year]?.push(record);
    return acc;
  }, {});

  const sortedYears = Object.keys(groupedRecords)?.sort((a, b) => b - a);

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
      prescription: 'bg-primary',
      lab: 'bg-secondary',
      vaccination: 'bg-success',
      consultation: 'bg-accent',
      imaging: 'bg-info',
      document: 'bg-muted-foreground'
    };
    return colors?.[type] || 'bg-muted-foreground';
  };

  return (
    <div className="space-y-8">
      {sortedYears?.map((year) => (
        <div key={year}>
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-lg font-semibold text-foreground">{year}</h3>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          <div className="relative pl-8 space-y-6">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border"></div>

            {groupedRecords?.[year]?.map((record, index) => (
              <div key={record?.id} className="relative">
                <div className={`absolute left-[-33px] w-8 h-8 rounded-full ${getRecordColor(record?.type)} flex items-center justify-center`}>
                  <Icon name={getRecordIcon(record?.type)} size={16} color="white" />
                </div>

                <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-foreground mb-1">{record?.title}</h4>
                      <p className="text-sm text-muted-foreground">{record?.category}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{record?.date}</span>
                  </div>

                  {record?.description && (
                    <p className="text-sm text-muted-foreground mb-3">{record?.description}</p>
                  )}

                  {record?.provider && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="Building2" size={14} />
                      <span>{record?.provider}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineView;