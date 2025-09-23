import { Button, Card, CardContent, FormControl, Grid, IconButton, MenuItem, Select, Typography } from "@mui/material";
import { useState } from 'react';
import DatePick from "@/components/atoms/DatePick";
import FormTextField from "@/components/atoms/FormTextField";
import { roomTypes } from "@/data/roomTypes";
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const FilterForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {collapsed ?
        (
          < Card >
            <CardContent >
              <Grid container rowSpacing={1.5} columnSpacing={2}  >
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
                  // onChange={handleChange}
                  // errors={errors}
                  // value={formData?.home_details || ""}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 4, lg: 3 }}>
                  <FormControl fullWidth variant="filled" size="small">
                    <Typography variant="label">Room Type</Typography>
                    <Select
                      size="medium"
                      labelId="fruit-label"
                      variant='outlined'
                    // value={fruit}
                    // onChange={(e) => setFruit(e.target.value)}
                    >
                      {roomTypes.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 4, lg: 3 }} pt={1} alignItems='end' container justifyItems='center' >
                  <Grid container flex={1} >
                    <Grid size="auto" sx={{ display: { sm: 'none' }, my: 'auto', }}>
                      <IconButton onClick={() => setCollapsed(false)} color="primary" sx={{ border: '0.5px solid', p: 0.75 }} >
                        <KeyboardArrowUpIcon sx={{ fontSize: "1.5rem" }} />
                      </IconButton>
                    </Grid>

                    <Grid flex={1} >
                      <Button
                        fullWidth
                        width="100%"
                        size="large"
                        variant="contained"
                        startIcon={<TravelExploreRoundedIcon />}
                        sx={{ px: 4, }}
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

            </CardContent >
          </ Card >
        )
        :
        (
          <Grid container p={1}>
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
          </Grid>
        )
      }
    </>
  );
};
