import { useState, useEffect } from "react";
import env from "@/constants/env";

export function useRoom(id) {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${env.API_URI}/api/v1/rooms/${id}`)
      .then((res) => {
        if (!res.ok)
          throw new Error(res?.message || "Room not found or failed to fetch.");
        return res.json();
      })
      .then((data) => {
        setRoom(data.room || data); // Adjust if API shape is different
        setLoading(false);
      })
      .catch((err) => {
        console.log("res", err);

        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return { room, loading, error };
}
