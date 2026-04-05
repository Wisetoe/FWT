import { useState, useEffect, useRef } from 'react';

export const useFilterMenu = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const [openSections, setOpenSections] = useState({
    artist: false,
    location: false,
    years: false
  });

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
  const closeFilter = () => setIsFilterOpen(false);

  const toggleSection = (section: 'artist' | 'location' | 'years') => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isFilterOpen && filterRef.current && !filterRef.current.contains(event.target as Node)) {
        closeFilter();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFilterOpen]); 

  return {
    isFilterOpen,
    openSections,
    toggleFilter,
    toggleSection,
    filterRef, 
  };
};