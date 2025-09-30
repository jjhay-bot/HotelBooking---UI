import { useParams, useNavigate } from "react-router-dom";
import { Stack, Button, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Screen from "@/components/atoms/Screen";
import RoomDetails from "@/components/organisms/RoomDetails";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRoom } from "@/hooks/useRoom";
import { LoadingState } from "@/components/atoms/Spinner";

export default function Room() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { room, loading, error } = useRoom(id);

  return (
    <Screen>
      <Stack py={2} px={{ xs: 1, md: 2 }} spacing={3}>
        {/* Back Button */}
        <Box>
          <motion.div whileHover={{ scaleY: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              variant="outlined"
            >
              Back to Rooms
            </Button>
          </motion.div>
        </Box>

        {/* Room Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {loading && (
            <>
              <LoadingState />
              <Typography>Loading room...</Typography>
            </>
          )}
          {error && <Typography color="error">{error}</Typography>}
          {room && <RoomDetails room={room} />}
        </motion.div>
      </Stack>
    </Screen>
  );
}
