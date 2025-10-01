import { useState, useEffect, useRef } from "react";
import { useRooms } from "@/hooks/useRooms";

/**
 * Custom hook for paginated, accumulated, and staggered room display.
 * Keeps useRooms generic for other consumers (e.g., admin dashboard).
 */
export function useStaggeredRooms({ filters = {}, pageSize = 6, staggerMs = 150 }) {
  const [page, setPage] = useState(1);
  const { rooms, loading, error, total } = useRooms(page, pageSize, filters);
  const [displayedRooms, setDisplayedRooms] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const prevRoomsRef = useRef([]);

  // Accumulate rooms on page/filter change
  useEffect(() => {
    if (page === 1) {
      setDisplayedRooms(rooms);
    } else if (rooms.length > 0) {
      setDisplayedRooms((prev) => {
        const ids = new Set(prev.map((r) => r.id));
        return [...prev, ...rooms.filter((r) => !ids.has(r.id))];
      });
    }
  }, [rooms, page]);

  // Staggered reveal for both initial and load more
  useEffect(() => {
    const prevRooms = prevRoomsRef.current;
    const isNewSearch = page === 1;
    if (isNewSearch) {
      setVisibleCount(0);
      prevRoomsRef.current = displayedRooms;
      if (displayedRooms && displayedRooms.length > 0) {
        let i = 0;
        const interval = setInterval(() => {
          i++;
          setVisibleCount((prev) => {
            if (prev < displayedRooms.length) return prev + 1;
            clearInterval(interval);
            return prev;
          });
          if (i >= displayedRooms.length) clearInterval(interval);
        }, staggerMs);
        return () => clearInterval(interval);
      }
    } else if (displayedRooms.length > prevRooms.length) {
      let i = prevRooms.length;
      const interval = setInterval(() => {
        i++;
        setVisibleCount(i);
        if (i >= displayedRooms.length) clearInterval(interval);
      }, staggerMs);
      prevRoomsRef.current = displayedRooms;
      return () => clearInterval(interval);
    }
    prevRoomsRef.current = displayedRooms;
  }, [displayedRooms, page, staggerMs]);

  const hasMore = displayedRooms.length < total;

  return {
    displayedRooms,
    visibleCount,
    loading,
    error,
    hasMore,
    setPage,
    page,
    total,
  };
}
