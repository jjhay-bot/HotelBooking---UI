import { useEffect, useRef, useState } from "react";

export function useAutoAnimate({ enabled, length, onStep }) {
  const [userInteracted, setUserInteracted] = useState(false);
  const intervalRef = useRef();

  useEffect(() => {
    if (!enabled || length === 0 || userInteracted) return;
    intervalRef.current = setInterval(() => {
      onStep();
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [enabled, length, userInteracted, onStep]);

  useEffect(() => {
    if (enabled) setUserInteracted(false);
  }, [enabled]);

  const stop = () => {
    setUserInteracted(true);
    clearInterval(intervalRef.current);
  };

  return { stop, userInteracted };
}
