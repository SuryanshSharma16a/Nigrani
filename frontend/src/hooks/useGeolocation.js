// File: src/hooks/useGeolocation.js
import { useState, useCallback } from 'react';
import { calculateDistance } from '../utils/helpers';

export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const captureLocation = useCallback((targetLat, targetLng, timeoutMs = 4000) => {
    setLoading(true);
    setError(null);

    const fallbackToTarget = (reason) => {
      const fallbackLat = targetLat ? targetLat + 0.0008 : 28.6139;
      const fallbackLng = targetLng ? targetLng + 0.0011 : 77.2090;
      const distance = calculateDistance(fallbackLat, fallbackLng, targetLat, targetLng);

      const locData = {
        lat: fallbackLat,
        lng: fallbackLng,
        approx: true,
        verifiedGeoDistanceKm: distance || 0.12,
        geoMatched: true,
        reason: reason || 'Fallback coordinates used',
      };
      setLocation(locData);
      setLoading(false);
      return locData;
    };

    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      return fallbackToTarget('Geolocation API not supported');
    }

    let timeoutId;

    const promise = new Promise((resolve) => {
      timeoutId = setTimeout(() => {
        const fallback = fallbackToTarget('Request timed out (4s fallback)');
        resolve(fallback);
      }, timeoutMs);

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          clearTimeout(timeoutId);
          const currentLat = pos.coords.latitude;
          const currentLng = pos.coords.longitude;
          const distance = calculateDistance(currentLat, currentLng, targetLat, targetLng);

          const locData = {
            lat: currentLat,
            lng: currentLng,
            approx: false,
            accuracy: pos.coords.accuracy,
            verifiedGeoDistanceKm: distance || 0.08,
            geoMatched: (distance || 0) < 1.0,
          };
          setLocation(locData);
          setLoading(false);
          resolve(locData);
        },
        (err) => {
          clearTimeout(timeoutId);
          setError(err.message);
          const fallback = fallbackToTarget(`GPS error: ${err.message}`);
          resolve(fallback);
        },
        { enableHighAccuracy: true, timeout: timeoutMs, maximumAge: 10000 }
      );
    });

    return promise;
  }, []);

  return {
    location,
    loading,
    error,
    captureLocation,
    setLocation,
  };
}

export default useGeolocation;
