import { useRef, useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { MyPinIcon, NavIcon } from "@assets/Icons";
import { Box, IconButton, Typography, CircularProgress } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { bgcolor } from "@constants";
import { useReactiveVar } from "@apollo/client";
import { pinLocationVar } from "@/gql/reactiveVar";
import { useLocationManager } from "@hooks/useLocationManager";

const DEFAULT_COORDS = [14.5995, 120.9842]; // Manila
const DEFAULT_ZOOM = 15;

export default function FixedPinMap() {
  const pinLocation = useReactiveVar(pinLocationVar);

  // Use pinLocation if available, otherwise default coords
  const initialCoords =
    pinLocation?.lat && pinLocation?.lng
      ? [pinLocation.lat, pinLocation.lng]
      : DEFAULT_COORDS;

  const [coords, setCoords] = useState(initialCoords);
  const [gpsPosition, setGpsPosition] = useState(null);
  const pinRef = useRef(null);

  // Use the shared location manager hook
  const { isGettingLocation, getCurrentLocation } = useLocationManager({
    enableFallback: false, // Map component doesn't need IP fallback
    onSuccess: (location) => {
      const myPos = [location.lat, location.lng];
      setGpsPosition(myPos);
      handleCoordsUpdate(myPos);
    },
    onError: (errorMessage) => {
      console.error("Error getting location:", errorMessage);
      // You could integrate with your notification system here
    }
  });

  // Handle coordinate updates and save to reactive var
  const handleCoordsUpdate = useCallback((newCoords) => {
    setCoords(newCoords);
    pinLocationVar({
      lat: newCoords[0],
      lng: newCoords[1],
    });
  }, []);  // Enhanced GPS fetching using the shared hook
  const goToMyLocation = useCallback(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  // Only get GPS when user explicitly requests it
  // Remove automatic fetch on mount to improve performance
  // useEffect(() => {
  //   goToMyLocation();
  // }, [goToMyLocation]);

  return (
    <Box sx={{ height: "100%", width: "100%", position: "relative" }} flex={1}>
      <MapContainer
        zoom={DEFAULT_ZOOM}
        center={coords}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        {/* <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        /> */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors &copy; <a href="https://www.carto.com/">CARTO</a>'
        />
        {gpsPosition && <RecenterMap position={gpsPosition} />}
        <LocationTracker onMove={handleCoordsUpdate} />
        <MyLocationButton onClick={goToMyLocation} isLoading={isGettingLocation} />
      </MapContainer>

      {/* Fixed Pin */}
      <Box
        ref={pinRef}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -100%)",
          pointerEvents: "none",
          zIndex: 999,
        }}
      >
        <MyPinIcon />
      </Box>
    </Box>
  );
}

// Moves the map when position changes
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, DEFAULT_ZOOM);
  }, [position, map]);
  return null;
}

// Updates state when dragging stops
function LocationTracker({ onMove }) {
  useMapEvents({
    moveend: (e) => {
      const center = e.target.getCenter();
      onMove([center.lat, center.lng]);
    },
  });
  return null;
}

// Custom "My Location" floating button
function MyLocationButton({ onClick, isLoading }) {
  return (
    <IconButton
      disableRipple
      onClick={onClick}
      disabled={isLoading}
      sx={{
        position: "absolute",
        bottom: 12,
        right: 12,
        zIndex: 2001,
        height: 72,
        width: 72,
        bgcolor: bgcolor.white,
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        opacity: isLoading ? 0.7 : 1,
        "&:hover": {
          bgcolor: bgcolor.white,
          opacity: isLoading ? 0.7 : 1,
          boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
        },
        "&:disabled": {
          bgcolor: bgcolor.white,
        },
      }}
    >
      {isLoading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
          <CircularProgress size={24} />
          <Typography variant="caption" color="primary" sx={{ fontSize: '0.6rem' }}>
            Loading...
          </Typography>
        </Box>
      ) : (
        <Typography
          variant="h6"
          color="primary"
          sx={{ textTransform: "uppercase", textAlign: "center", pb: 1 }}
        >
          <NavIcon />
          <Box pt={0.25}>My location</Box>
        </Typography>
      )}
    </IconButton>
  );
}
