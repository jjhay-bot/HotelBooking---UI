import { useState, useEffect } from "react";
import { Box, Typography, useTheme, Button, Grid } from "@mui/material";
import { motion } from "framer-motion";
import AutoStoriesSharpIcon from '@mui/icons-material/AutoStoriesSharp';
import { useNavigate } from 'react-router-dom';

// Banner: elegant hotel lobby, soft lighting, clear right side
const bannerImg = "https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
// Travel elements
const suitcaseImg = "https://images.unsplash.com/photo-1653249901286-8a7d2468e331?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const palmImg = "https://plus.unsplash.com/premium_photo-1661877303180-19a028c21048?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const beachImg = "https://images.unsplash.com/photo-1721369483526-62f48a00b949?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


const travelSlides = [
  {
    img: suitcaseImg,
    alt: "Suitcase",
  },
  {
    img: palmImg,
    alt: "Palm Tree",
  },
  {
    img: beachImg,
    alt: "Beach View",
  },
];

const SplashScreen = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const gold = theme.palette.primary?.main || '#D4AF37';
  const bg = theme.palette.background?.default || '#f5f5f5';
  const text = theme.palette.text?.primary || '#1a237e';
  const blue = theme.palette.primary?.main || '#1976d2';
  const beige = theme.palette.background?.paper || '#fbeed7';

  const [slideIdx, setSlideIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % travelSlides.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {/* Enhanced Banner with parallax effects and animated elements */}
      <Box sx={{ position: "relative", width: "100vw", maxHeight: 280, mb: 2, overflow: "hidden" }}>
        {/* Main Banner Image with zoom animation */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <Box
            component="img"
            src={bannerImg}
            alt="Elegant Hotel Lobby"
            sx={{
              width: "100vw",
              maxHeight: 280,
              objectFit: "cover",
              filter: "brightness(0.85) saturate(1.2)",
              borderBottomLeftRadius: 32,
              borderBottomRightRadius: 32,
            }}
          />
        </motion.div>

        {/* Animated floating travel element - larger and more prominent */}
        <motion.div
          initial={{ opacity: 0, x: -100, rotate: -10 }}
          animate={{
            opacity: 1,
            x: 0,
            rotate: 0,
            y: [0, -15, 0],
          }}
          transition={{
            opacity: { duration: 1 },
            x: { duration: 1.5, ease: "easeOut" },
            rotate: { duration: 1.5, ease: "easeOut" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{
            position: "absolute",
            top: 32,
            left: 24,
            zIndex: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 80,
              height: 180,
              background: `linear-gradient(135deg, ${beige}f5 0%, ${gold}33 100%)`,
              borderRadius: 6,
              boxShadow: `0 8px 32px ${gold}66`,
              // border: `1px solid ${gold}`,
              // p: 1.5,
              backdropFilter: "blur(10px)",
            }}
          >
            <motion.img
              key={travelSlides[slideIdx].alt}
              src={travelSlides[slideIdx].img}
              alt={travelSlides[slideIdx].alt}
              initial={{ opacity: 0, scale: 0.9, rotateY: -60 }}
              animate={{
                opacity: 1,
                scale: [1, 1.05, 1],
                rotateY: 0,
              }}
              exit={{ opacity: 0, scale: 0.7, rotateY: 90 }}
              transition={{
                opacity: { duration: 0.5 },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                rotateY: { duration: 0.8, ease: "easeOut" },
              }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 16,
                boxShadow: `0 4px 24px ${blue}66`,
                border: `1px solid ${gold}`,
                background: 'transparent',
                objectFit: 'cover',
              }}
            />
          </Box>
        </motion.div>

        {/* Animated sparkle effects */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: `${20 + i * 15}%`,
              left: `${15 + i * 10}%`,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: gold,
              boxShadow: `0 0 12px ${gold}`,
              zIndex: 2,
            }}
          />
        ))}

        {/* Enhanced gradient overlay with shimmer effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: `linear-gradient(90deg, ${beige}dd 0%, transparent 50%, ${bg}dd 100%)`,
              borderBottomLeftRadius: 32,
              borderBottomRightRadius: 32,
              zIndex: 1,
            }}
          />
        </motion.div>

        {/* Right side gradient for text clarity */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "45vw",
            height: "100%",
            background: `linear-gradient(90deg, transparent 0%, ${bg}f5 80%)`,
            borderBottomRightRadius: 32,
            zIndex: 1,
          }}
        />

        {/* Animated gold border accent */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: 4,
              background: `linear-gradient(90deg, ${gold} 0%, ${blue} 50%, ${gold} 100%)`,
              borderBottomLeftRadius: 32,
              borderBottomRightRadius: 32,
              zIndex: 4,
              boxShadow: `0 0 16px ${gold}`,
            }}
          />
        </motion.div>
      </Box>


      {/* Enhanced text overlay with animations */}
      <Box sx={{ width: "80vw", display: "flex", justifyContent: "flex-end" }}>
        <Box sx={{ textAlign: "right", maxWidth: 480 }}>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Typography variant="logo" color="#706b3b">
              Bedder Deals
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <Typography
              variant="h6"
              sx={{
                color: blue,
                mb: 2,
                fontFamily: 'Playfair Display, serif',
                fontWeight: 600,
                letterSpacing: 1,
                textShadow: `0 2px 8px ${bg}99`,
              }}
            >
              ✨ A modern and elegant hotel booking experience ✨
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <Typography
              variant="body1"
              sx={{
                color: text,
                mb: 2,
                fontFamily: 'Roboto, sans-serif',
                lineHeight: 1.8,
                fontWeight: 500,
              }}
            >
              🏨 Luxurious rooms • 🌟 Premium service • 🌴 Dream destinations
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: text,
                fontFamily: 'Roboto, sans-serif',
                opacity: 0.9,
                fontStyle: 'italic',
              }}
            >
              Your perfect stay awaits...
            </Typography>
          </motion.div>
        </Box>
      </Box>


      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, scale: [1, 1.06, 1] }}
        transition={{
          opacity: { duration: 1, delay: 1, ease: "easeOut" },
          y: { duration: 1, delay: 1, ease: "easeOut" },
          scale: { duration: 1.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
        }}
        whileHover={{ scale: 1.12, }}
        whileTap={{ scale: 0.97 }}
        style={{ marginTop: 32 }}
      >
        <Button
          startIcon={<AutoStoriesSharpIcon />}
          sx={{
            px: 6,
            py: 1.5,
            fontSize: { xs: 14, sm: 16 },
            fontWeight: 600,
            borderRadius: 8,
            boxShadow: `0 2px 12px ${gold}33`,
            background: `linear-gradient(90deg, ${gold} 0%, ${blue} 100%)`,
            color: '#fff',
            textTransform: 'none',
            transition: 'box-shadow 0.3s',
          }}
          onClick={() => navigate('/explore')} // Navigate to the explore page on click
        >
          Start Exploring . . .
        </Button>
      </motion.div>
    </Box>
  );
};

export default SplashScreen;
