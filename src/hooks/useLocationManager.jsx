import { useState, useCallback } from 'react';
import { pinLocationVar } from '@/gql/reactiveVar';
import { getCurrentLocationEnhanced, getFallbackLocation } from '@/utils/locationHelpers';

/**
 * Custom hook for managing location state and operations
 * Provides consistent location handling across components
 */
export function useLocationManager(options = {}) {
  const {
    enableFallback = false,
    onSuccess,
    onError,
    onStart,
    onComplete,
  } = options;

  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [lastKnownLocation, setLastKnownLocation] = useState(null);

  const getCurrentLocation = useCallback(async () => {
    if (isGettingLocation) return null; // Prevent multiple simultaneous requests

    setIsGettingLocation(true);
    onStart?.();

    try {
      // Try enhanced GPS location first
      const location = await getCurrentLocationEnhanced();

      const locationData = {
        lat: location.lat,
        lng: location.lng,
        accuracy: location.accuracy,
        timestamp: Date.now(),
        method: 'gps'
      };

      // Update reactive variable
      pinLocationVar({
        lat: location.lat,
        lng: location.lng,
      });

      setLastKnownLocation(locationData);
      onSuccess?.(locationData);

      return locationData;

    } catch (error) {
      console.error("GPS location failed:", error.message);

      // Try fallback if enabled and not a permission error
      if (enableFallback && !error.message.includes('denied')) {
        try {
          const fallbackLocation = await getFallbackLocation();

          const locationData = {
            lat: fallbackLocation.lat,
            lng: fallbackLocation.lng,
            accuracy: fallbackLocation.accuracy,
            timestamp: Date.now(),
            method: 'ip',
            isFallback: true
          };

          // Update reactive variable
          pinLocationVar({
            lat: fallbackLocation.lat,
            lng: fallbackLocation.lng,
          });

          setLastKnownLocation(locationData);
          onSuccess?.(locationData);

          return locationData;

        } catch (fallbackError) {
          console.error("Fallback location failed:", fallbackError.message);
          onError?.(error.message); // Return original GPS error, not fallback error
          return null;
        }
      } else {
        onError?.(error.message);
        return null;
      }

    } finally {
      setIsGettingLocation(false);
      onComplete?.();
    }
  }, [isGettingLocation, enableFallback, onSuccess, onError, onStart, onComplete]);

  const setLocation = useCallback((lat, lng) => {
    const locationData = {
      lat,
      lng,
      timestamp: Date.now(),
      method: 'manual'
    };

    pinLocationVar({ lat, lng });
    setLastKnownLocation(locationData);

    return locationData;
  }, []);

  return {
    isGettingLocation,
    lastKnownLocation,
    getCurrentLocation,
    setLocation,
  };
}
