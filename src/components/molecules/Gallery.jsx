import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAutoAnimate } from "@/hooks/useAutoAnimate";

export const MotionBox = motion(Box);

export default function Gallery({ cards = [], anime = false }) {
  const [active, setActive] = useState(cards[0]?.id || null);
  const theme = useTheme();

  // Memoize the step function to avoid unnecessary effect reruns
  const step = useCallback(() => {
    setActive(prevActive => {
      const currentIndex = cards.findIndex(card => card.id === prevActive);
      const nextIndex = (currentIndex + 1) % cards.length;
      return cards[nextIndex]?.id || cards[0]?.id;
    });
  }, [cards]);

  const { stop } = useAutoAnimate({
    enabled: anime,
    length: cards.length,
    onStep: step
  });

  const handleCardClick = (cardId) => {
    setActive(cardId);
    stop(); // Stop auto-animation
  };

  return (
    <Box display="flex" gap={0.75} height='100%' >
      {cards.map((card) => (
        <MotionBox
          key={card.id}
          onClick={() => handleCardClick(card.id)}
          animate={{ flex: active === card.id ? 3 : 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          whileHover={{ scale: 1.03 }}
          sx={{
            display: "flex",
            borderRadius: active === card.id ? 6 : 6,
            overflow: 'clip',
          }}
        >
          <Card
            sx={{
              width: "100%",
              height: "100%", // always inherit from parent
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              p: 0
            }}
          >
            <CardMedia
              component="img"
              src={card.img}
              alt={card.title || ""}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            {card.title && active === card.id && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.3 }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              >
                <Box
                  sx={{
                    p: 1.75,
                    background: `linear-gradient(to top, ${theme.palette.primary.main}dd, transparent)`,
                    color: theme.palette.primary.contrastText,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                      lineHeight: 1.4
                    }}
                  >
                    {card.title}
                  </Typography>
                </Box>
              </motion.div>
            )}
          </Card>
        </MotionBox>
      ))}
    </Box>
  );
}
