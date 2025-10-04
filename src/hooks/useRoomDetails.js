import { useState } from "react";
import { useRoom } from "./useRoom";
import { useAuth } from "@/context/AuthContext";
import env from "@/constants/env";
import { onError, onSuccess } from "@/gql/uiActions";

export function useRoomDetails(roomId) {
  const { room, loading, error } = useRoom(roomId);
  const { user, fetchWithCsrf } = useAuth();

  // Booking state
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  // Calculate total price
  let nights = 1;
  if (checkIn && checkOut) {
    nights = Math.max(1, Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24)));
  }
  const totalPrice = room ? (room.pricePerNight * nights + 5) * 1.12 : 0;

  // Booking action
  const bookRoom = async () => {
    let newErrors = {};
    setApiError("");
    // Validation
    if (!checkIn) newErrors.checkIn = "Check-in date is required";
    if (!checkOut) newErrors.checkOut = "Check-out date is required";
    if (checkIn && checkOut && checkOut <= checkIn)
      newErrors.checkOut = "Check-out must be after check-in";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return false;

    const payload = {
      userId: user?.id,
      roomId: room.id,
      startDate: checkIn.toISOString(),
      endDate: checkOut.toISOString(),
      status: "Reserved",
      totalPrice: Number(totalPrice.toFixed(2)),
      notes,
    };

    try {
      const res = await fetchWithCsrf(`${env.API_URI}/api/v1/bookings`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      if (!res.ok) {
        let msg = "Booking failed";
        if (res.status === 401) {
          msg = "You are not authorized. Please log in again.";
          setApiError(msg);
          onError(msg);
          setShowLoginDialog(true);
          return false;
        }
        try {
          const data = await res.json();
          if (data && data.message) {
            msg = data.message;
            onError(msg);
          }
        } catch {
          // ignore
        }
        setApiError(msg);
        onError(msg);
        return false;
      }
      onSuccess("Booking successful!");
      return true;
    } catch (e) {
      console.log(e);
      onError(e.message);
      setApiError(e.message);
      return false;
    }
  };

  return {
    room,
    loading,
    error,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    notes,
    setNotes,
    errors,
    apiError,
    showLoginDialog,
    setShowLoginDialog,
    totalPrice,
    bookRoom,
  };
}
