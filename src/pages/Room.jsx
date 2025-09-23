import { useParams, useNavigate } from 'react-router-dom';
import { Stack, Button, Box } from '@mui/material';
import { motion } from "framer-motion";
import Screen from "@/components/atoms/Screen";
import RoomDetails from "@/components/organisms/RoomDetails";
import { rooms } from "@/data/rooms";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Room() {
  const { id } = useParams();
  const navigate = useNavigate();

  const room = rooms.find(r => r.id === parseInt(id));

  return (
    <Screen>
      <Stack p={2} spacing={3}>
        {/* Back Button */}
        <Box>
          <motion.div
            whileHover={{ scaleY: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
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
          <RoomDetails room={room} />
        </motion.div>
      </Stack>
    </Screen>
  );
}
