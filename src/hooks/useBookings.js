import { env } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function useBookings(page = 1, pageSize = 10) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const { fetchWithCsrf } = useAuth();

  useEffect(() => {
    setLoading(true);
    fetchWithCsrf(`${env.API_URI}/api/v1/bookings`, {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        setBookings(Array.isArray(data?.bookings) ? data?.bookings : []);
        setTotal(typeof data.totalCount === "number" ? data.totalCount : 0);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page, pageSize, fetchWithCsrf]);

  return { bookings, loading, error, total };
}
