import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useEffect } from "react"
import { useRef } from "react"
import { useCallback } from "react"
import { Typography } from "@mui/material"

export default ({ taglines }) => {
  const timerRef = useRef(null);


  const [ref, slider] = useKeenSlider({
    initial: 0,
    loop: true,
  })

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      slider.current?.next();
    }, 3000);
  }, [slider]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);


  return (
    <div ref={ref} className="keen-slider">
      {
        taglines.map((tagline, index) => (
          <Typography
            variant="h4"
            className="keen-slider__slide"
            key={index}
            sx={{
              textAlign: 'center',
              fontSize: { sm: '1.5rem' },
              fontWeight: 700,
              lineHeight: 1.3,
              letterSpacing: '-0.01em'
            }}
          >
            {tagline}
          </Typography>
        ))
      }
    </div>
  )
}

