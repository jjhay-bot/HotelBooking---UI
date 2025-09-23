/**
 * Enhanced geolocation utilities optimized for webview environments
 */

/**
 * Detects if the app is running in a webview
 */
export const isWebView = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /wv|WebView/i.test(userAgent) ||
    window.navigator.standalone ||
    /Android.*; wv\)/.test(userAgent);
};

/**
 * Gets optimal geolocation options based on environment
 */
export const getLocationOptions = () => {
  const isInWebView = isWebView();

  return {
    // In webview, prioritize speed over accuracy
    enableHighAccuracy: !isInWebView,
    // Shorter timeout for webview to prevent hanging
    timeout: isInWebView ? 10000 : 15000,
    // Accept slightly older cached location
    maximumAge: 60000,
  };
};

/**
 * Enhanced getCurrentPosition with better error handling and fallbacks
 */
export const getCurrentLocationEnhanced = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    const options = getLocationOptions();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        let errorMessage = 'Unknown location error';

        switch (error.code) {
          case 1:
            errorMessage = 'Location access denied by user';
            break;
          case 2:
            errorMessage = 'Location unavailable';
            break;
          case 3:
            errorMessage = 'Location request timed out';
            break;
        }

        reject(new Error(errorMessage));
      },
      options
    );
  });
};

/**
 * Fallback location method using IP-based geolocation
 * (You might want to implement this with a service like ipapi.co)
 */
export const getFallbackLocation = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();

    if (data.latitude && data.longitude) {
      return {
        lat: data.latitude,
        lng: data.longitude,
        accuracy: 10000, // IP-based location is less accurate
        isFallback: true,
      };
    }

    throw new Error('IP geolocation failed');
  } catch {
    throw new Error('Fallback location service unavailable');
  }
};
