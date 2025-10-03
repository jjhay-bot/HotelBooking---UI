// hooks/useFetchWithRefresh.js
import { useAuth } from "@/context/AuthContext";

// Usage: const fetchWithRefresh = useFetchWithRefresh();
// Then: await fetchWithRefresh(url, options)
export function useFetchWithRefresh() {
  const { refreshToken } = useAuth();

  return async function fetchWithRefresh(url, options = {}, retry = true) {
    try {
      const res = await fetch(url, { ...options, credentials: 'include' });
      if (res.status === 401 && retry && !url.includes('/me')) {
        // Attempt to refresh token
        const refreshed = await refreshToken();
        if (refreshed) {
          // Retry original request once
          return fetchWithRefresh(url, options, false);
        }
      }
      return res;
    } catch (err) {
      // Optional: log stack trace for debugging
      console.error('API call failed:', url, err);
      console.trace();
      throw err;
    }
  };
}
