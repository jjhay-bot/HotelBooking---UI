import { useState, useEffect, useCallback, useMemo } from "react";
import { env } from "@/constants";
import { map, uniq } from "lodash";

/**
 * Custom hook for managing location data (provinces, cities, barangays)
 *
 * Features:
 * - Fetches data only once and caches it
 * - Pre-computes and memoizes provinces, cities, and barangays lists
 * - Provides efficient filtering methods that work with cached data
 * - Handles loading and error states
 *
 * @returns {Object} Hook state and methods
 */
export const useLocationData = () => {
  const [locationData, setLocationData] = useState({
    cities: [],
    localities: [],
  });
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);

  // Fetch location data from API - only once
  useEffect(() => {
    let isMounted = true;

    const fetchLocationData = async () => {
      try {
        const response = await fetch(`${env.API_ADMIN_GS}/locality`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-Growsari-App": "tier-webform",
            Authorization: `Bearer ${sessionStorage.getItem("authToken") || ""}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (isMounted) {
          // Process and cache the data
          const cities = data?.data?.city?.list || [];
          const localities = data?.data?.locality?.list || [];

          setLocationData({
            cities,
            localities,
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching locality and cities:", error);
        if (isMounted) {
          setError(error.message);
          setLoading(false);
        }
      }
    };

    fetchLocationData();

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - fetch only once on mount

  // Manual refetch function
  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${env.API_ADMIN_GS}/locality`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-Growsari-App": "tier-webform",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Process and cache the data
      const cities = data?.data?.city?.list || [];
      const localities = data?.data?.locality?.list || [];

      setLocationData({
        cities,
        localities,
      });
    } catch (error) {
      console.error("Error fetching locality and cities:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cache computed values using useMemo for performance
  const provinces = useMemo(() => {
    return uniq(map(locationData.cities, "province")).sort();
  }, [locationData.cities]);

  const allCities = useMemo(() => {
    return locationData.cities
      .map((city) => ({
        id: city.city,
        label: city.city,
        province: city.province,
        ...city,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [locationData.cities]);

  const allBarangays = useMemo(() => {
    return locationData.localities
      .map((locality) => ({
        id: locality.barangay || locality.locality,
        label: locality.barangay || locality.locality,
        city: locality.city,
        province: locality.province,
        ...locality,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [locationData.localities]);

  // Filter functions that work with cached data
  const getCitiesByProvince = useCallback(
    (province) => {
      if (!province) return [];

      return allCities.filter((city) => city.province === province);
    },
    [allCities],
  );

  // Get barangays by city - filter from cached data
  const getBarangaysByCity = useCallback(
    (city) => {
      if (!city) return [];
      const serializeBrgy = allBarangays.filter((barangay) => barangay.city === city).map(b => ({ ...b, id: b?.label }))

      return serializeBrgy
    },
    [allBarangays],
  );

  return {
    // Data states
    locationData,
    loading,
    error,

    // Methods for filtering cached data
    refetch,
    getCitiesByProvince,
    getBarangaysByCity,

    // Pre-computed cached values
    provinces,
    allCities,
    allBarangays,
  };
};
