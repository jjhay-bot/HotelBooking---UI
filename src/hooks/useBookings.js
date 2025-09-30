import { env } from "@/constants";
import { useEffect, useState } from "react";

export default function useBookings(page = 1, pageSize = 10) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const token = sessionStorage.getItem("jwt");
    fetch(`${env.API_URI}/api/v1/bookings?page=${page}&pageSize=${pageSize}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setBookings(Array.isArray(data.bookings) ? data.bookings : []);
          setTotal(typeof data.totalCount === "number" ? data.totalCount : 0);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [page, pageSize]);

  return { bookings, loading, error, total };
}
