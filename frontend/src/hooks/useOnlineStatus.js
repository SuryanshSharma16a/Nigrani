// File: src/hooks/useOnlineStatus.js
import { useState, useEffect } from 'react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(() => {
    return typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
      ? navigator.onLine
      : true;
  });

  const [manualOffline, setManualOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const effectiveOnline = isOnline && !manualOffline;

  const toggleManualOffline = () => setManualOffline((prev) => !prev);

  return {
    isOnline: effectiveOnline,
    rawOnline: isOnline,
    manualOffline,
    toggleManualOffline,
    setManualOffline,
  };
}

export default useOnlineStatus;
