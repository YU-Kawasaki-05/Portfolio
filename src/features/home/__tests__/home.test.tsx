import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useHome } from '../hooks/use-home';
import { getGreeting, formatLastUpdated } from '../utils/home-utils';
import { HomeService } from '../services/home-service';

describe('Home Feature', () => {
  describe('useHome hook', () => {
    it('should initialize with loading state', () => {
      const { result } = renderHook(() => useHome());
      expect(result.current.isLoading).toBe(true);
      expect(result.current.isAnimationComplete).toBe(false);
    });

    it('should complete loading after timeout', async () => {
      const { result } = renderHook(() => useHome());
      
      // Wait for the timeout to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 1100));
      });
      
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isAnimationComplete).toBe(true);
    });
  });

  describe('home utils', () => {
    it('should return appropriate greeting based on time', () => {
      const greeting = getGreeting();
      expect(typeof greeting).toBe('string');
      expect(['おはようございます', 'こんにちは', 'こんばんは']).toContain(greeting);
    });

    it('should format date correctly', () => {
      const date = new Date('2024-01-15');
      const formatted = formatLastUpdated(date);
      expect(formatted).toBe('2024年1月15日');
    });
  });

  describe('home service', () => {
    it('should return home page data', () => {
      const data = HomeService.getHomePageData();
      expect(data).toHaveProperty('hero');
      expect(data).toHaveProperty('navigationCards');
      expect(data).toHaveProperty('lastUpdated');
    });

    it('should return navigation cards', () => {
      const cards = HomeService.getNavigationCards();
      expect(Array.isArray(cards)).toBe(true);
      expect(cards.length).toBeGreaterThan(0);
    });

    it('should return hero data', () => {
      const hero = HomeService.getHeroData();
      expect(hero).toHaveProperty('title');
      expect(hero).toHaveProperty('subtitle');
      expect(hero).toHaveProperty('description');
    });
  });
});