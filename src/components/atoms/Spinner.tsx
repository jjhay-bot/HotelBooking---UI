import { useReactiveVar } from "@apollo/client";
import { SpinnerIcon } from "@assets/Icons";
import { loadingVar } from "@gql/reactiveVar";
import { Box, CircularProgress, circularProgressClasses, Dialog, Stack } from "@mui/material";
import React from "react";

export default function Spinner() {
  const loading = useReactiveVar(loadingVar)

  if (!loading) return;

  return <LoadingState />
}


export const LoadingState = ({ loading = true }) => {
  if (!loading) return null;

  return <Stack
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      // bgcolor: 'rgba(0,0,0,0.3)',
      zIndex: 1300,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Stack sx={{
      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: "#ED5A29",
      opacity: 0.75,
      animation: 'spin 8s linear infinite', // <-- spinning
      '@keyframes spin': {
        '0%': { transform: 'translate(-50%, -50%) rotate(0deg)', },
        '100%': { transform: 'translate(-50%, -50%) rotate(360deg)', },
      },
    }}>
      {/* <SpinnerIcon /> */}
      <FacebookCircularProgress />
    </Stack>
  </Stack>
}

export function FacebookCircularProgress(props) {
  return (
    <Box>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) => theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={60}
        thickness={5}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={60}
        thickness={5}
        // color='secondary'
        {...props}
      />
    </Box>
  );
}
