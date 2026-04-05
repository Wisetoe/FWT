import { useEffect, useState } from 'react';
import axios from 'axios';

const BaseURL = "https://test-front.framework.team/paintings";

export const useFetchPaintings = (
  currentPage: number,
  searchQuery: string,
  artistId: string,
  locationId: string,
  yearFrom: string,
  yearTo: string,
  triggerFetch: number
) => {
  const [post, setPost] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 6;

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      axios.get(BaseURL, {
        params: {
          _page: currentPage,
          _limit: limit,
          q: searchQuery || undefined,
          authorId: artistId || undefined,
          locationId: locationId || undefined,
          created_gte: yearFrom || undefined,
          created_lte: yearTo || undefined,
        }
      })
      .then((response) => {
        setPost(response.data);
        const totalCount = parseInt(response.headers['x-total-count'] || '0');
        setTotalPages(Math.ceil(totalCount / limit));
      })
      .catch(err => console.error(err));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, searchQuery, artistId, locationId, yearFrom, yearTo, triggerFetch]);

  return { post, totalPages, limit };
};