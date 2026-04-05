import { useState } from 'react';

export const usePagination = (initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const getPaginationItems = (totalPages: number, currentPage: number) => {
    const items: (number | string)[] = [];
    
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage - 2 && i <= currentPage + 2)
      ) {
        items.push(i);
      } else if (i === currentPage + 3 && i < totalPages) {
        items.push('...');
      }
    }
    return items.filter((item, index) => items.indexOf(item) === index);
  };

  return {
    currentPage,
    setCurrentPage,
    getPaginationItems,
  };
};