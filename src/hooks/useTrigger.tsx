import { useState } from 'react';

export const useTriggerFetch = () => {
  const [triggerFetch, setTriggerFetch] = useState(0);

  const handleShowResults = () => {
    setTriggerFetch(prev => prev + 1);
  };

  return {
    triggerFetch,
    handleShowResults,
  };
};