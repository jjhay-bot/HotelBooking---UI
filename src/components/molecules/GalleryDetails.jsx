import { useState } from "react";
import { motion } from "framer-motion";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function GalleryDetails({ cards = [] }) {
  const [active, setActive] = useState(cards[0]?.id || 1);
  const theme = useTheme();

  const activeCard = cards.find((c) => c.id === active);

  return (
    <Box display="flex" gap={{ xs: 0.5, md: 1 }} height="100%">
      {/* Left side: Active card */}
      <Box flex={5} display="flex" borderRadius={3} overflow="hidden">
        {activeCard && (
          <Card
            sx={{
              width: "100%",
              aspectRatio: 5 / 3,
              position: "relative",
              overflow: "hidden",
              p: 0
            }}
          >
            <CardMedia
              component="img"
              src={activeCard.img}
              alt={activeCard.title || ""}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",

              }}
            />
            {activeCard.title && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
              >
                <Box
                  sx={{
                    p: 1.5,
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
                    {activeCard.title}
                  </Typography>
                </Box>
              </motion.div>
            )}
          </Card>
        )}
      </Box>

      {/* Right side: Thumbnails list */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        gap={{ xs: 0.25, md: 0.5 }}
        // height="100%"
        sx={{
          overflowY: cards.length >= 4 ? "auto" : "hidden",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: theme.palette.primary.main,
            borderRadius: "2px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: theme.palette.primary.dark,
          },
        }}
      >
        {cards.map((card) => (
          <motion.div
            key={card.id}
            onClick={() => setActive(card.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{
              minHeight: "calc(20%)",
              maxHeight: "calc(20%)",
              cursor: "pointer",
              borderRadius: "8px",
              overflow: "hidden",
              border:
                active === card.id
                  ? `2px solid ${theme.palette.primary.main}`
                  : "2px solid transparent",
              aspectRatio: 5/3,
            }}
          >
            <CardMedia
              component="img"
              src={card.img}
              alt={card.title || ""}
              style={{
                width: "100%",
                height: "100%",
                objectFit: 'cover',
              }}
            />
          </motion.div>
        ))}
      </Box>
    </Box >
  );
}
