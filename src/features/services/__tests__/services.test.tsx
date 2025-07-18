import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useServices } from '../hooks/use-services';
import { filterServicesByCategory, formatServicePrice } from '../utils/service-utils';
import { ServiceItem } from '../types/service-types';

describe('Services Feature', () => {
  describe('useServices hook', () => {
    it('should initialize with Consulting as default category', () => {
      const { result } = renderHook(() => useServices());
      expect(result.current.activeCategory).toBe('Consulting');
    });

    it('should toggle category correctly', () => {
      const { result } = renderHook(() => useServices());
      
      act(() => {
        result.current.toggleCategory('Development');
      });
      
      expect(result.current.activeCategory).toBe('Development');
    });

    it('should check if category is active', () => {
      const { result } = renderHook(() => useServices());
      
      expect(result.current.isActive('Consulting')).toBe(true);
      expect(result.current.isActive('Development')).toBe(false);
    });
  });

  describe('service utils', () => {
    const mockServices: ServiceItem[] = [
      {
        id: '1',
        title: 'Web Development',
        description: 'Full-stack web development',
        category: 'Development',
        price: 100000,
      },
      {
        id: '2',
        title: 'Technical Consulting',
        description: 'Architecture consulting',
        category: 'Consulting',
        price: 50000,
      },
    ];

    it('should filter services by category', () => {
      const developmentServices = filterServicesByCategory(mockServices, 'Development');
      expect(developmentServices).toHaveLength(1);
      expect(developmentServices[0].title).toBe('Web Development');
    });

    it('should format service price correctly', () => {
      const formatted = formatServicePrice(100000);
      expect(formatted).toBe('￥100,000');
    });
  });
});