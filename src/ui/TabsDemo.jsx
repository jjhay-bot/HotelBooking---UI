import React from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { Favorite, Home, Settings } from '@mui/icons-material';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box p={2}><Typography>{children}</Typography></Box>}
    </div>
  );
}

export default function TabsDemo() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      {/* Standard Tabs */}
      <Typography variant="h6">Standard Tabs</Typography>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Home" />
        <Tab label="Settings" />
        <Tab label="Disabled" disabled />
      </Tabs>
      <TabPanel value={value} index={0}>Standard Tab - Home</TabPanel>
      <TabPanel value={value} index={1}>Standard Tab - Settings</TabPanel>

      {/* Scrollable Tabs with Icons */}
      <Typography variant="h6" mt={4}>Scrollable with Icons</Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable tabs"
      >
        <Tab icon={<Home />} label="Home" />
        <Tab icon={<Favorite />} label="Favorites" />
        <Tab icon={<Settings />} label="Settings" />
        <Tab icon={<Settings />} label="More" />
        <Tab icon={<Settings />} label="Extra" />
      </Tabs>

      {/* FullWidth Variant */}
      <Typography variant="h6" mt={4}>FullWidth</Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab label="Tab One" />
        <Tab label="Tab Two" />
        <Tab label="Tab Three" />
      </Tabs>

      {/* Vertical Tabs */}
      <Typography variant="h6" mt={4}>Vertical Tabs</Typography>
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          sx={{ borderRight: 1, borderColor: 'divider', minWidth: 120 }}
        >
          <Tab label="Tab A" />
          <Tab label="Tab B" />
          <Tab label="Tab C" />
        </Tabs>
        <Box sx={{ flexGrow: 1 }}>
          <TabPanel value={value} index={0}>Vertical Tab A</TabPanel>
          <TabPanel value={value} index={1}>Vertical Tab B</TabPanel>
          <TabPanel value={value} index={2}>Vertical Tab C</TabPanel>
        </Box>
      </Box>

      {/* Icon Position */}
      <Typography variant="h6" mt={4}>Icons on Top</Typography>
      <Tabs value={value} onChange={handleChange}>
        <Tab icon={<Home />} iconPosition="top" label="Home" />
        <Tab icon={<Settings />} iconPosition="bottom" label="Settings" />
        <Tab icon={<Favorite />} iconPosition="start" label="Favorites" />
        <Tab icon={<Favorite />} iconPosition="end" label="End Icon" />
      </Tabs>

      {/* Wrapped Label */}
      <Typography variant="h6" mt={4}>Wrapped Label</Typography>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Short" />
        <Tab label="A very long label that should wrap" wrapped />
      </Tabs>
    </Box>
  );
}
