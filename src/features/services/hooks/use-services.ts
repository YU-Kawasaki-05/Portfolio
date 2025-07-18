import { useState, useCallback } from 'react';
import { ServiceCategory } from '../types/service-types';

export function useServices() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('Consulting');

  const toggleCategory = useCallback((category: ServiceCategory) => {
    setActiveCategory(prev => prev === category ? 'Consulting' : category);
  }, []);

  const isActive = useCallback((category: ServiceCategory) => {
    return activeCategory === category;
  }, [activeCategory]);

  return {
    activeCategory,
    setActiveCategory,
    toggleCategory,
    isActive,
  };
}