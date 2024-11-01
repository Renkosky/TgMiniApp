'use client';

import { useState, useEffect } from 'react';

export function useWebApp() {
  const [webApp, setWebApp] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeWebApp = async () => {
      try {
        const WebAppModule = (await import('@twa-dev/sdk')).default;
        setWebApp(WebAppModule);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load WebApp'));
      } finally {
        setIsLoading(false);
      }
    };

    initializeWebApp();
  }, []);

  return { webApp, isLoading, error };
} 