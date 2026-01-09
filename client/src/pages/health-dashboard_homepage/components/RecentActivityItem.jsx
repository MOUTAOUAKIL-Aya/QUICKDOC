import React from 'react';
import Icon from '../../../components/AppIcon';

const HealthPracticeItem = ({ practice }) => {
  const getPracticeIcon = (type) => {
    switch (type) {
      case 'hydration':
        return 'Droplets';
      case 'sleep':
        return 'Moon';
      case 'nutrition':
        return 'Apple';
      case 'movement':
        return 'Running';
      case 'mindfulness':
        return 'Brain';
      default:
        return 'Heart';
    }
  };

  const getPracticeColor = (type) => {
    switch (type) {
      case 'hydration':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'sleep':
        return 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400';
      case 'nutrition':
        return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      case 'movement':
        return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400';
      case 'mindfulness':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getFrequencyBadge = (frequency) => {
    switch (frequency) {
      case 'Daily':
        return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'Nightly':
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400';
      default:
        return 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className={`w-10 h-10 rounded-lg ${getPracticeColor(practice?.type)} flex items-center justify-center flex-shrink-0`}>
        <Icon name={getPracticeIcon(practice?.type)} size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-sm font-medium text-foreground">{practice?.title}</h4>
          <span className={`text-xs px-2 py-1 rounded-full ${getFrequencyBadge(practice?.time)}`}>
            {practice?.time}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{practice?.description}</p>
      </div>
    </div>
  );
};

export default HealthPracticeItem;