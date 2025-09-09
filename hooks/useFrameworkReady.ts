import { useEffect, useState } from 'react';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate some async initialization
    const initialize = async () => {
      // For now, we'll just set it to true immediately.
      // In a real app, this might involve loading assets, checking auth, etc.
      setIsReady(true);
      window.frameworkReady?.();
    };
    initialize();
  }, []);

  return isReady;
}
