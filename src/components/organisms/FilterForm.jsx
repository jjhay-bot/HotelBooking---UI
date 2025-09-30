import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePick from "@/components/atoms/DatePick";
import FormTextField from "@/components/atoms/FormTextField";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useRoomTypes } from "@/hooks/useRoomTypes";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

export const FilterForm = ({ setFilters }) => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guestCount, setGuestCount] = useState(2);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const { roomTypes, loading: loadingRoomTypes } = useRoomTypes();

  // Helper to set time for check-in/check-out
  const setTime = (date, hours, minutes = 0) => {
    if (!date) return null;
    const d = new Date(date);
    d.setHours(hours, minutes, 0, 0);
    return d;
  };

  const handleSearch = () => {
    setFilters({
      checkIn: checkIn ? setTime(checkIn, 14).toISOString() : null, // 14:00:00Z
      checkOut: checkOut ? setTime(checkOut, 12).toISOString() : null, // 12:00:00Z
      guestCount,
      roomTypeId: selectedRoomType, // should be ID from roomTypes
    });
    setCollapsed(false);
  };

  const handleReset = () => {
    setCheckIn(null);
    setCheckOut(null);
    setGuestCount(1);
    setSelectedRoomType("");
    setFilters({
      checkIn: null,
      checkOut: null,
      guestCount: 1,
      roomTypeId: "",
    });
  };

  return (
    <AnimatePresence mode="popLayout" s>
      {collapsed ? (
        <motion.div
          key="expanded"
          initial={{ opacity: 0, height: 120 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 120 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Card>
            <CardContent>
              <Grid container rowSpacing={1.5} columnSpacing={2}>
                {/* ...existing grid content... */}
                <Grid size={{ xs: 12, sm: 4, lg: 3 }}>
                  <DatePick label="Check-in Date" value={checkIn} onChange={setCheckIn} />
                </Grid>

                <Grid size={{ xs: 12, sm: 4, lg: 3 }}>
                  <DatePick
                    label="Check-out Date"
                    value={checkOut}
                    onChange={setCheckOut}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 4, lg: 3 }}>
                  <FormTextField
                    required
                    name="guestCount"
                    type="number"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    inputProps={{ min: 1 }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 4, lg: 3 }}>
                  <FormControl fullWidth variant="filled" size="small">
                    <Typography variant="label">Room Type</Typography>
                    <Select
                      value={selectedRoomType}
                      onChange={(e) => setSelectedRoomType(e.target.value)}
                      disabled={loadingRoomTypes}
                    >
                      <MenuItem value="">All Types</MenuItem>
                      {roomTypes.map((opt) => (
                        <MenuItem key={opt.id || opt.value} value={opt.id || opt.value}>
                          {opt.name || opt.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid
                  size={{ xs: 12, sm: 4, lg: 3 }}
                  pt={1}
                  alignItems="end"
                  container
                  justifyItems="center"
                >
                  <Grid container flex={1}>
                    {/* <Grid size="auto" sx={{ display: { sm: "none" }, my: "auto" }}>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <IconButton
                          onClick={() => setCollapsed(false)}
                          color="primary"
                          sx={{ border: "0.5px solid", p: 0.75 }}
                        >
                          <KeyboardArrowUpIcon sx={{ fontSize: "1.5rem" }} />
                        </IconButton>
                      </motion.div>
                    </Grid> */}

                    <Grid flex={1}>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          fullWidth
                          width="100%"
                          size="large"
                          variant="contained"
                          startIcon={<TravelExploreRoundedIcon />}
                          sx={{ px: 4 }}
                          onClick={handleSearch}
                        >
                          Search
                        </Button>
                      </motion.div>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  size={{ xs: 12, sm: 4, lg: 3 }}
                  pt={1}
                  alignItems="end"
                  container
                  justifyItems="center"
                >
                  <Grid container flex={1}>
                    <Grid size="auto" sx={{ display: { sm: "none" }, my: "auto" }}>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <IconButton
                          onClick={() => setCollapsed(false)}
                          color="primary"
                          sx={{ border: "0.5px solid", p: 0.75 }}
                        >
                          <KeyboardArrowUpIcon sx={{ fontSize: "1.5rem" }} />
                        </IconButton>
                      </motion.div>
                    </Grid>

                    <Grid flex={1}>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          fullWidth
                          width="100%"
                          size="large"
                          variant="text"
                          startIcon={<RotateLeftIcon />}
                          sx={{ px: 4 }}
                          onClick={handleReset}
                        >
                          Reset
                        </Button>
                      </motion.div>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid size="grow" container>
                  <Grid
                    container
                    flex={1}
                    height="100%"
                    justifyContent="end"
                    alignItems="end"
                  >
                    <Grid size="auto" sx={{ display: { xs: "none", sm: "flex" }, my: 1 }}>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <IconButton
                          onClick={() => setCollapsed(false)}
                          color="primary"
                          sx={{ border: "0.5px solid", p: 0.75 }}
                        >
                          <KeyboardArrowUpIcon sx={{ fontSize: "1.5rem" }} />
                        </IconButton>
                      </motion.div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          key="collapsed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Grid container p={1}>
            <motion.div
              style={{ width: "100%" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                fullWidth
                size="large"
                variant="outlined"
                startIcon={<TravelExploreRoundedIcon />}
                onClick={() => setCollapsed(true)}
                sx={{ bgcolor: "white" }}
              >
                Search
              </Button>
            </motion.div>
          </Grid>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
