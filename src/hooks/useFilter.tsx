import { useState } from 'react';

export const useFilters = () => {
  const [artistId, setArtistId] = useState<string>('');
  const [locationId, setLocationId] = useState<string>('');
  const [yearFrom, setYearFrom] = useState<string>('');
  const [yearTo, setYearTo] = useState<string>('');

  const handleClear = () => {
    setArtistId('');
    setLocationId('');
    setYearFrom('');
    setYearTo('');
  };

  return {
    artistId,
    locationId,
    yearFrom,
    yearTo,
    setArtistId,
    setLocationId,
    setYearFrom,
    setYearTo,
    handleClear,
  };
};