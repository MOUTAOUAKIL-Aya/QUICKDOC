import React from 'react';
import Icon from '../../../components/AppIcon';

const SpecializationFilter = ({ selectedSpecialization, onSpecializationChange }) => {
  const specializations = [
    { id: 'all', name: 'All Doctors', icon: 'Users', count: 156 },
    { id: 'general', name: 'General Practice', icon: 'Stethoscope', count: 45 },
    { id: 'cardiology', name: 'Cardiology', icon: 'Heart', count: 18 },
    { id: 'dermatology', name: 'Dermatology', icon: 'Sparkles', count: 22 },
    { id: 'pediatrics', name: 'Pediatrics', icon: 'Baby', count: 28 },
    { id: 'gynecology', name: 'Gynecology', icon: 'User', count: 15 },
    { id: 'orthopedics', name: 'Orthopedics', icon: 'Bone', count: 12 },
    { id: 'psychiatry', name: 'Psychiatry', icon: 'Brain', count: 14 },
    { id: 'neurology', name: 'Neurology', icon: 'Activity', count: 10 },
    { id: 'ophthalmology', name: 'Ophthalmology', icon: 'Eye', count: 16 },
    { id: 'ent', name: 'ENT Specialist', icon: 'Ear', count: 11 }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-foreground mb-4">Specializations</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {specializations?.map((spec) => (
          <button
            key={spec?.id}
            onClick={() => onSpecializationChange(spec?.id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
              selectedSpecialization === spec?.id
                ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50 hover:bg-muted'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              selectedSpecialization === spec?.id ? 'bg-primary/20' : 'bg-muted'
            }`}>
              <Icon
                name={spec?.icon}
                size={24}
                color={selectedSpecialization === spec?.id ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
              />
            </div>
            <div className="text-center">
              <p className={`text-xs font-medium ${
                selectedSpecialization === spec?.id ? 'text-primary' : 'text-foreground'
              }`}>
                {spec?.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{spec?.count} doctors</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpecializationFilter;