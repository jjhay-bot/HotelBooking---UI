import React from 'react';
import {
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Stack,
} from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

export default function RadioDemo() {
  return (
    <Stack spacing={4} p={4}>
      {/* Basic usage */}
      <FormControl>
        <FormLabel>Basic</FormLabel>
        <RadioGroup defaultValue="a">
          <FormControlLabel value="a" control={<Radio />} label="Option A" />
          <FormControlLabel value="b" control={<Radio />} label="Option B" />
        </RadioGroup>
      </FormControl>

      {/* Sizes */}
      <FormControl>
        <FormLabel>Sizes</FormLabel>
        <RadioGroup defaultValue="medium">
          <FormControlLabel value="small" control={<Radio size="small" />} label="Small" />
          <FormControlLabel value="medium" control={<Radio size="medium" />} label="Medium" />
        </RadioGroup>
      </FormControl>

      {/* Colors */}
      <FormControl>
        <FormLabel>Colors</FormLabel>
        <RadioGroup defaultValue="primary">
          <FormControlLabel value="primary" control={<Radio color="primary" />} label="Primary" />
          <FormControlLabel value="secondary" control={<Radio color="secondary" />} label="Secondary" />
          <FormControlLabel value="error" control={<Radio color="error" />} label="Error" />
          <FormControlLabel value="success" control={<Radio color="success" />} label="Success" />
          <FormControlLabel value="info" control={<Radio color="info" />} label="Info" />
          <FormControlLabel value="warning" control={<Radio color="warning" />} label="Warning" />
        </RadioGroup>
      </FormControl>

      {/* Disabled */}
      <FormControl>
        <FormLabel>Disabled</FormLabel>
        <RadioGroup>
          <FormControlLabel value="enabled" control={<Radio />} label="Enabled" />
          <FormControlLabel value="disabled" control={<Radio disabled />} label="Disabled" />
        </RadioGroup>
      </FormControl>

      {/* Custom icons */}
      <FormControl>
        <FormLabel>Custom Icons</FormLabel>
        <RadioGroup defaultValue="fav">
          <FormControlLabel
            value="fav"
            control={
              <Radio
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
              />
            }
            label="Favorite"
          />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}
