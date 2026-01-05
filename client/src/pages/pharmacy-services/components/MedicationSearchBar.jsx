import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const MedicationSearchBar = ({ onSearch, searchQuery, setSearchQuery }) => {
  const [suggestions] = useState([
    "Paracetamol 500mg",
    "Amoxicillin 250mg",
    "Ibuprofen 400mg",
    "Omeprazole 20mg",
    "Metformin 850mg"
  ]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e) => {
    setSearchQuery(e?.target?.value);
    setShowSuggestions(e?.target?.value?.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search medications by name, condition, or active ingredient..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(searchQuery?.length > 0)}
          className="pr-12"
        />
        <button
          onClick={handleSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
          aria-label="Search medications"
        >
          <Icon name="Search" size={20} />
        </button>
      </div>
      {showSuggestions && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowSuggestions(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
            {suggestions?.filter(s => s?.toLowerCase()?.includes(searchQuery?.toLowerCase()))?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 text-left text-sm text-popover-foreground hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg flex items-center gap-3"
                >
                  <Icon name="Pill" size={16} className="text-muted-foreground" />
                  <span>{suggestion}</span>
                </button>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MedicationSearchBar;
