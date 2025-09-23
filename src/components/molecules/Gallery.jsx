import { useState } from "react";
import { motion } from "framer-motion";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const MotionBox = motion(Box);

export default function MuiCardGallery({ cards = [] }) {
  const [active, setActive] = useState(1);
  const theme = useTheme();

  return (
    <Box display="flex" gap={0.75} height='100%'>
      {cards.map((card) => (
        <MotionBox
          key={card.id}
          onClick={() => setActive(card.id)}
          animate={{ flex: active === card.id ? 3 : 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          sx={{
            display: "flex",
            borderRadius: active === card.id ? 6 : 6,
            overflow: "hidden"
          }}
        >
          <Card
            sx={{
              borderRadius: active === card.id ? 6 : 6,
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
