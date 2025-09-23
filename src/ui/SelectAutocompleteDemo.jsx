import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
  TextField,
  Typography,
} from '@mui/material';

const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape'];

export default function SelectAutocompleteDemo() {
  const [fruit, setFruit] = useState('');
  const [multiFruit, setMultiFruit] = useState([]);
  const [autoFruit, setAutoFruit] = useState(null);
  const [multiAutoFruit, setMultiAutoFruit] = useState([]);
  const [freeSoloValue, setFreeSoloValue] = useState('');

  return (
    <Box sx={{ display: 'grid', gap: 4, maxWidth: 500, p: 4 }}>
      <Typography variant="h6">Select (Single) — Filled, Small</Typography>
      <FormControl fullWidth variant="filled" size="small">
        <InputLabel id="fruit-label">Fruit</InputLabel>
        <Select
          labelId="fruit-label"
          value={fruit}
          onChange={(e) => setFruit(e.target.value)}
        >
          {options.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="h6">Select (Multiple) — Outlined, Medium</Typography>
      <FormControl fullWidth variant="outlined" size="medium">
        <InputLabel id="multi-fruit-label">Fruits</InputLabel>
        <Select
          labelId="multi-fruit-label"
          multiple
          value={multiFruit}
          onChange={(e) => setMultiFruit(e.target.value)}
          renderValue={(selected) => selected.join(', ')}
        >
          {options.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="h6">Autocomplete (Single) — Standard, Small</Typography>
      <Autocomplete
        fullWidth
        options={options}
        value={autoFruit}
        onChange={(e, newValue) => setAutoFruit(newValue)}
        size="small"
        renderInput={(params) => (
          <TextField {...params} label="Choose fruit" variant="standard" />
        )}
      />

      <Typography variant="h6">Autocomplete (Multiple) — Filled, Medium</Typography>
      <Autocomplete
        multiple
        fullWidth
        options={options}
        value={multiAutoFruit}
        onChange={(e, newValue) => setMultiAutoFruit(newValue)}
        size="medium"
        renderInput={(params) => (
          <TextField {...params} label="Select fruits" variant="filled" />
        )}
      />

      <Autocomplete
        multiple
        fullWidth
        options={options}
        value={multiAutoFruit}
        onChange={(e, newValue) => setMultiAutoFruit(newValue)}
        size="medium"
        renderInput={(params) => (
          <TextField {...params} label="Select fruits" variant='outlined' />
        )}
      />

      <Typography variant="h6">Autocomplete (Free Solo) — Outlined, Small</Typography>
      <Autocomplete
        freeSolo
        fullWidth
        options={options}
        value={freeSoloValue}
        onInputChange={(e, newInputValue) => setFreeSoloValue(newInputValue)}
        size="small"
        renderInput={(params) => (
          <TextField {...params} label="Type or choose" variant="outlined" />
        )}
      />
    </Box>
  );
}
