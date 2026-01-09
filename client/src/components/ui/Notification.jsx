import React, { useEffect } from 'react';
import Icon from '../AppIcon';

const Notification = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const borderColor = type === 'success' ? 'border-green-200' : 'border-red-200';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const iconColor = type === 'success' ? 'text-green-600' : 'text-red-600';
  const iconName = type === 'success' ? 'CheckCircle' : 'AlertCircle';
  const title = type === 'success' ? 'Success!' : 'Error';

  return (
    <div className="fixed top-24 right-6 z-50 animate-fade-in">
      <div className={`${bgColor} border ${borderColor} rounded-xl shadow-lg p-4 max-w-sm`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${type === 'success' ? 'bg-green-100' : 'bg-red-100'} flex items-center justify-center`}>
            <Icon name={iconName} size={20} className={iconColor} />
          </div>
          <div className="flex-1">
            <p className={`${textColor} font-medium`}>{title}</p>
            <p className={`${textColor} text-sm`}>{message}</p>
          </div>
          <button 
            onClick={onClose}
            className={`${type === 'success' ? 'text-green-500 hover:text-green-700' : 'text-red-500 hover:text-red-700'}`}
          >
            <Icon name="X" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;