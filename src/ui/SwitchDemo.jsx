import React from 'react';
import {
  Switch,
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormControl,
  Stack,
} from '@mui/material';


export default function SwitchDemo() {
  return (
    <Stack spacing={4} p={4}>
      {/* Basic */}
      <FormControl component="fieldset">
        <FormLabel component="legend">Basic</FormLabel>
        <FormGroup row>
          <FormControlLabel control={<Switch />} label="Unchecked" />
          <FormControlLabel control={<Switch defaultChecked />} label="Checked" />
        </FormGroup>
      </FormControl>

      {/* Sizes */}
      <FormControl component="fieldset">
        <FormLabel component="legend">Sizes</FormLabel>
        <FormGroup row>
          <FormControlLabel control={<Switch size="small" />} label="Small" />
          <FormControlLabel control={<Switch size="medium" />} label="Medium" />
        </FormGroup>
      </FormControl>

      {/* Colors */}
      <FormControl component="fieldset">
        <FormLabel component="legend">Colors</FormLabel>
        <FormGroup row>
          <FormControlLabel control={<Switch color="primary" defaultChecked />} label="Primary" />
          <FormControlLabel control={<Switch color="secondary" defaultChecked />} label="Secondary" />
          <FormControlLabel control={<Switch color="error" defaultChecked />} label="Error" />
          <FormControlLabel control={<Switch color="success" defaultChecked />} label="Success" />
          <FormControlLabel control={<Switch color="warning" defaultChecked />} label="Warning" />
          <FormControlLabel control={<Switch color="info" defaultChecked />} label="Info" />
        </FormGroup>
      </FormControl>

      {/* Disabled */}
      <FormControl component="fieldset">
        <FormLabel component="legend">Disabled</FormLabel>
        <FormGroup row>
          <FormControlLabel control={<Switch disabled />} label="Off" />
          <FormControlLabel control={<Switch disabled defaultChecked />} label="On" />
        </FormGroup>
      </FormControl>

      {/* Custom Icons (using sx to simulate icon styling) */}
      <FormControl component="fieldset">
        <FormLabel component="legend">Custom Icons (simulated via sx)</FormLabel>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                defaultChecked
                sx={{
                  '& .MuiSwitch-thumb': {
                    backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
                      '<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M9 16.17l-3.88-3.88L4.7 13.7 9 18l12-12-1.41-1.41z"/></svg>'
                    )}")`,
                  },
                }}
              />
            }
            label="Check Icon"
          />
        </FormGroup>
      </FormControl>
    </Stack>
  );
}
