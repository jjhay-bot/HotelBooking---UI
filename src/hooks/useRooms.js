import { useState, useEffect, useCallback } from "react";
import env from "@/constants/env";

export function useRooms(filters = {}) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(filters.page || 1);
  const [pageSize] = useState(filters.pageSize || 3);
  const [hasMore, setHasMore] = useState(true);

  // Always include status=available unless overridden
  const status = filters.status || "available";

  const fetchRooms = useCallback((reset = false, customPage = page) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.checkIn) params.append("checkIn", filters.checkIn);
    if (filters.checkOut) params.append("checkOut", filters.checkOut);
    if (filters.guestCount) params.append("guestCount", filters.guestCount);
    if (filters.roomTypeId) params.append("roomTypeId", filters.roomTypeId);
    params.append("status", status);
    params.append("page", customPage);
    params.append("pageSize", pageSize);
    const url = `${env.API_URI}/api/v1/rooms?${params.toString()}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch rooms");
        return res.json();
      })
      .then((data) => {
        const newRooms = data.rooms || data;
        setRooms((prev) => (reset ? newRooms : [...prev, ...newRooms]));
        setHasMore(newRooms.length === pageSize);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [filters, pageSize, status]);

  // Initial and filter change effect
  useEffect(() => {
    setPage(filters.page || 1);
    fetchRooms(true, filters.page || 1);
    // eslint-disable-next-line
  }, [filters.checkIn, filters.checkOut, filters.guestCount, filters.roomTypeId, status]);

  // Load more for infinite scroll or button
  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchRooms(false, nextPage);
  };

  return { rooms, loading, error, hasMore, loadMore };
}
