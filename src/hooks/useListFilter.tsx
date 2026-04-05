import { useEffect, useState } from 'react';
import axios from 'axios';

export const useAuthorsAndLocations = () => {
  const [authors, setAuthors] = useState<{id: number, name: string}[]>([]);
  const [locations, setLocations] = useState<{id: number, location: string}[]>([]);

  useEffect(() => {
    axios.get("https://test-front.framework.team/authors").then(res => setAuthors(res.data));
    axios.get("https://test-front.framework.team/locations").then(res => setLocations(res.data));
  }, []);

  return { authors, locations };
};