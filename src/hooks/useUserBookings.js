import { useEffect, useState } from "react";
import env from "@/constants/env";
import { useAuth } from "@/context/AuthContext";

export default function useUserBookings(userId) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchWithCsrf } = useAuth();

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    fetchWithCsrf(`${env.API_URI}/api/v1/bookings/by-user/${userId}`, {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        setBookings(Array.isArray(data) ? data : []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId, fetchWithCsrf]);

  return { bookings, loading, error };
}
