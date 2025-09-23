import { Button, Card, CardContent, FormControl, Grid, IconButton, MenuItem, Select, Typography } from "@mui/material";
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import DatePick from "@/components/atoms/DatePick";
import FormTextField from "@/components/atoms/FormTextField";
import { roomTypes } from "@/data/roomTypes";
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const FilterForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState('');

  const [collapsed, setCollapsed] = useState(false)

  return (
    <AnimatePresence mode='popLayout'>
      {collapsed ? (
        <motion.div
          key='expanded'
          initial={{ opacity: 0, height: 120 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 120 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        // style={{ overflow: "hidden" }}
        >
          <Card >
            <CardContent>
              <Grid container rowSpacing={1.5} columnSpacing={2}>
                {/* ...existing grid content... */}
                <Grid size={{ xs: 12, sm: 4, lg: 3 }}>
                  <DatePick
                    label="Check-in Date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 4, lg: 3 }}>
                  <DatePick
                    label="Check-out Date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 4, lg: 3 }}>
                  <FormTextField
                    required
                    name="guests"
                    type="number"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 4, lg: 3 }}>
                  <FormControl fullWidth variant="filled" size="small">
                    <Typography variant="label">Room Type</Typography>
                    <Select
                      value={selectedRoomType}
                      onChange={(e) => setSelectedRoomType(e.target.value)}
                    >
                      {roomTypes.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 4, lg: 3 }} pt={1} alignItems='end' container justifyItems='center'>
                  <Grid container flex={1}>
                    <Grid size="auto" sx={{ display: { sm: 'none' }, my: 'auto' }}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconButton
                          onClick={() => setCollapsed(false)}
                          color="primary"
                          sx={{ border: '0.5px solid', p: 0.75, }}
                        >
                          <KeyboardArrowUpIcon sx={{ fontSize: "1.5rem" }} />
                        </IconButton>
                      </motion.div>
                    </Grid>

                    <Grid flex={1}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          fullWidth
                          width="100%"
                          size="large"
                          variant="contained"
                          startIcon={<TravelExploreRoundedIcon />}
                          sx={{ px: 4 }}
                        >
                          Search
                        </Button>
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
                sx={{ bgcolor: 'white' }}
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
