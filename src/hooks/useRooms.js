import { useState, useEffect } from "react";
import env from "@/constants/env";

export function useRooms(filters = {}) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Build query params from filters
    const params = new URLSearchParams();
    if (filters.checkIn) params.append("checkIn", filters.checkIn);
    if (filters.checkOut) params.append("checkOut", filters.checkOut);
    if (filters.guestCount) params.append("guestCount", filters.guestCount);
    if (filters.roomTypeId) params.append("roomTypeId", filters.roomTypeId);
    // Add more params as needed
    const url = `${env.API_URI}/api/v1/rooms${params.toString() ? `?${params.toString()}` : ''}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch rooms");
        return res.json();
      })
      .then((data) => {
        setRooms(data.rooms || data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [filters.checkIn, filters.checkOut, filters.guestCount, filters.roomTypeId]);

  return { rooms, loading, error };
}
