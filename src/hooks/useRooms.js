import { env } from "@/constants";
import { cleanRoomFilters } from "@/utils/security/cleanRoomFilters";
import { useEffect, useState } from "react";

export function useRooms(page = 1, pageSize = 10, filters = {}, trigger = 0) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    // Clean filters before building query params
    const safeFilters = cleanRoomFilters(filters);
    // Handle legacy roomType
    let roomTypeId = safeFilters.roomTypeId || safeFilters.roomType || undefined;
    // Build all params in one object
    const allParams = {
      page,
      pageSize,
      ...safeFilters,
      roomTypeId,
    };
    // Remove legacy roomType from params if present
    delete allParams.roomType;
    // Remove undefined values
    Object.keys(allParams).forEach(key => {
      if (allParams[key] === undefined || allParams[key] === "") {
        delete allParams[key];
      }
    });
    const params = new URLSearchParams(allParams);

    // Remove sessionStorage usage, rely on HTTP-only cookies and context
    // const token = sessionStorage.getItem("jwt");
    // Add credentials: 'include' to fetch
    fetch(`${env.API_URI}/api/v1/rooms?${params.toString()}`, {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch rooms");
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setRooms(Array.isArray(data.rooms) ? data.rooms : []);
          setTotal(typeof data.totalCount === "number" ? data.totalCount : 0);
          // Add hasMore and loadMore for infinite scroll
          // hasMore: true if there are more rooms to load
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
  }, [page, pageSize, filters.status, filters.checkIn, filters.checkOut, filters.guestCount, filters.roomTypeId, filters.roomType, filters.minPrice, filters.maxPrice, trigger]);

  return {
    rooms,
    loading,
    error,
    total,
    hasMore: rooms.length > 0 && rooms.length < total,
    loadMore: () => { }, // placeholder for compatibility
  };
}
