import { color } from "@/constants";

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
    case 'occupied':
      return {
        ...baseStyle,
        background: `linear-gradient(45deg, ${color.red}cc, ${color.red}66)`, // Red gradient
      };
    case 'maintenance':
      return {
        ...baseStyle,
        background: `linear-gradient(45deg, ${theme.palette.secondary.main}cc, ${theme.palette.secondary.main}66)`, // Secondary gradient
      };
    default:
      return baseStyle;
  }
};

export const getRoomStatusText = (status) => {
  switch (status) {
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
  return status === 'available';
};
