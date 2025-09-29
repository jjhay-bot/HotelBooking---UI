import { useState, useEffect } from "react";
import { env } from "@/constants";

export function useRoomTypes() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRoomTypes() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${env.API_URI}/api/v1/roomtypes`);
        if (!res.ok) throw new Error("Failed to fetch room types");
        const data = await res.json();
        setRoomTypes(data);
      } catch (e) {
        setRoomTypes([]);
        setError(e.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchRoomTypes();
  }, []);

  return { roomTypes, loading, error };
}
