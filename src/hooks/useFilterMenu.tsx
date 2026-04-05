import { useState } from 'react';

export const useFilterMenu = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    artist: false,
    location: false,
    years: false
  });

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
  
  const toggleSection = (section: 'artist' | 'location' | 'years') => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return {
    isFilterOpen,
    openSections,
    toggleFilter,
    toggleSection,
  };
};