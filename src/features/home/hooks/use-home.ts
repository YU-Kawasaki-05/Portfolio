import { useState, useEffect } from 'react';

export function useHome() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    // Simulate loading time for 3D components
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsAnimationComplete(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return {
    isLoading,
    isAnimationComplete,
    setIsAnimationComplete,
  };
}