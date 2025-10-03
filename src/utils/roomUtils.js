import { color } from "@/constants";
import { lowerCase } from "lodash";

export const getRoomStatusStyle = (status, theme) => {
  const baseStyle = {
    textTransform: 'capitalize',
    fontSize: '0.55rem',
    letterSpacing: '0.5px',
    color: theme.palette.primary.contrastText,
    border: 'none',
    textShadow: '0 1px 3px rgba(0,0,0,0.15)',
  };

  switch (status) {
    case 'available':
      return {
        ...baseStyle,
        background: `linear-gradient(45deg, ${color.green}ee, ${color.green}88)`, // Green gradient
      };
    case 'confirmed':
      return {
        ...baseStyle,
        background: `linear-gradient(45deg, ${color.mid}ee, ${color.mid}88)`, // Green gradient
      };
    case 'occupied':
      return {
        ...baseStyle,
        background: `linear-gradient(45deg, ${color.red}cc, ${color.red}66)`, // Red gradient
      };
    case 'maintenance':
      return {
        ...baseStyle,
        background: `linear-gradient(45deg, ${color.low}cc, ${color.low}66)`,
      };
    case 'reserved':
      return {
        ...baseStyle,
        background: `linear-gradient(45deg, ${color.red}cc, ${color.red}66)`,
      };
    default:
      return {
        ...baseStyle,
        background: `linear-gradient(45deg, ${color.low}ee, ${color.low}88)`, // Green gradient
      };
  }
};

export const getRoomStatusText = (status) => {
  switch (lowerCase(status)) {
    case 'available':
      return 'Book Now!';
    case 'occupied':
      return 'Currently Occupied';
    case 'maintenance':
      return 'Under Maintenance';
    default:
      return 'View Room Details';
  }
};

export const isRoomBookable = (status) => {
  return lowerCase(status) === 'available';
};
