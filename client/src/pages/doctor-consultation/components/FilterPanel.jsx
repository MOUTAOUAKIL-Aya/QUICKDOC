import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ filters, onFilterChange, onResetFilters, isMobile, onClose }) => {
  const specializationOptions = [
    { value: 'all', label: 'All Specializations' },
    { value: 'general', label: 'General Practitioner' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'dermatology', label: 'Dermatology' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'gynecology', label: 'Gynecology' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'psychiatry', label: 'Psychiatry' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'ophthalmology', label: 'Ophthalmology' },
    { value: 'ent', label: 'ENT Specialist' }
  ];

  const languageOptions = [
    { value: 'all', label: 'All Languages' },
    { value: 'arabic', label: 'Arabic' },
    { value: 'french', label: 'French' },
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' }
  ];

  const cityOptions = [
    { value: 'all', label: 'All Cities' },
    { value: 'casablanca', label: 'Casablanca' },
    { value: 'rabat', label: 'Rabat' },
    { value: 'marrakech', label: 'Marrakech' },
    { value: 'fes', label: 'Fes' },
    { value: 'tangier', label: 'Tangier' },
    { value: 'agadir', label: 'Agadir' }
  ];

  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'experience', label: 'Most Experienced' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'availability', label: 'Soonest Available' }
  ];

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${isMobile ? 'h-full overflow-y-auto' : ''}`}>
      {isMobile && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
      )}
      <div className="space-y-6">
        <div>
          <Input
            type="search"
            placeholder="Search doctors by name..."
            value={filters?.search}
            onChange={(e) => onFilterChange('search', e?.target?.value)}
            className="mb-4"
          />
        </div>

        <div>
          <Select
            label="Specialization"
            options={specializationOptions}
            value={filters?.specialization}
            onChange={(value) => onFilterChange('specialization', value)}
            searchable
          />
        </div>

        <div>
          <Select
            label="Language"
            options={languageOptions}
            value={filters?.language}
            onChange={(value) => onFilterChange('language', value)}
          />
        </div>

        <div>
          <Select
            label="City"
            options={cityOptions}
            value={filters?.city}
            onChange={(value) => onFilterChange('city', value)}
            searchable
          />
        </div>

        <div>
          <Select
            label="Sort By"
            options={sortOptions}
            value={filters?.sortBy}
            onChange={(value) => onFilterChange('sortBy', value)}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Availability</h3>
          <Checkbox
            label="Available Now"
            checked={filters?.availableNow}
            onChange={(e) => onFilterChange('availableNow', e?.target?.checked)}
          />
          <Checkbox
            label="Available Today"
            checked={filters?.availableToday}
            onChange={(e) => onFilterChange('availableToday', e?.target?.checked)}
          />
          <Checkbox
            label="Verified Doctors Only"
            checked={filters?.verifiedOnly}
            onChange={(e) => onFilterChange('verifiedOnly', e?.target?.checked)}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Consultation Type</h3>
          <Checkbox
            label="Video Consultation"
            checked={filters?.videoConsultation}
            onChange={(e) => onFilterChange('videoConsultation', e?.target?.checked)}
          />
          <Checkbox
            label="Chat Consultation"
            checked={filters?.chatConsultation}
            onChange={(e) => onFilterChange('chatConsultation', e?.target?.checked)}
          />
          <Checkbox
            label="In-Person Visit"
            checked={filters?.inPerson}
            onChange={(e) => onFilterChange('inPerson', e?.target?.checked)}
          />
        </div>

        <div className="pt-4 border-t border-border">
          <Button
            variant="outline"
            fullWidth
            iconName="RotateCcw"
            iconPosition="left"
            onClick={onResetFilters}
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;