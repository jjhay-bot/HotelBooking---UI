// Utility to clean and sanitize filters for useRooms

function cleanValue(value, type) {
  switch (type) {
    case "status": {
      const allowed = ["available", "booked", "maintenance"];
      const status = value.trim().toLowerCase();
      return allowed.includes(status) ? status : "";
    }
    case "guestCount":
    case "roomTypeId":
    case "roomType":
      return String(value).replace(/[^0-9]/g, "");
    case "minPrice":
    case "maxPrice":
      return String(value).replace(/[^0-9.]/g, "");
    case "checkIn":
    case "checkOut":
      return value.trim();
    default:
      return value;
  }
}

export function cleanRoomFilters(filters) {
  const cleaned = {};
  for (const key in filters) {
    if (filters[key] != null && filters[key] !== "") {
      cleaned[key] = cleanValue(filters[key], key);
    }
  }
  return cleaned;
}
