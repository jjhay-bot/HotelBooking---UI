import { env } from "@/constants";
import { useEffect, useState } from "react";

export function useRooms(page = 1, pageSize = 10, filters = {}, trigger = 0) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    // Build query params from filters
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("pageSize", pageSize);
    if (filters.status) params.append("status", filters.status);
    if (filters.checkIn) params.append("checkIn", filters.checkIn);
    if (filters.checkOut) params.append("checkOut", filters.checkOut);
    if (filters.guestCount) params.append("guestCount", filters.guestCount);
    if (filters.roomTypeId) {
      params.append("roomTypeId", filters.roomTypeId);
    } else if (filters.roomType) {
      // Only append roomType if roomTypeId is not present
      params.append("roomTypeId", filters.roomType); // treat legacy roomType as roomTypeId
    }

    const token = sessionStorage.getItem("jwt");
    fetch(`${env.API_URI}/api/v1/rooms?${params.toString()}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch rooms");
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setRooms(Array.isArray(data.rooms) ? data.rooms : []);
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
  }, [page, pageSize, filters.status, filters.checkIn, filters.checkOut, filters.guestCount, filters.roomTypeId, filters.roomType, trigger]);

  return { rooms, loading, error, total };
}
