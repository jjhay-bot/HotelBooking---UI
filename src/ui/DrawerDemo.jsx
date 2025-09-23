import * as React from "react";
import { Box, Button, Drawer, Typography, Divider, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function DrawerDemo() {
  const [state, setState] = React.useState({
    left: false,
    right: false,
    top: false,
    bottom: false,
    persistent: true,
    mini: true,
  });

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
  };

  const drawerContent = (title) => (
    <Box sx={{ width: 250, padding: 2 }}>
      <Typography variant="h6">{title}</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography>Some drawer content</Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3">MUI Drawer Demos</Typography>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
        <Button variant="outlined" onClick={toggleDrawer("left", true)}>
          Left Drawer
        </Button>
        <Button variant="outlined" onClick={toggleDrawer("right", true)}>
          Right Drawer
        </Button>
        <Button variant="outlined" onClick={toggleDrawer("top", true)}>
          Top Drawer
        </Button>
        <Button variant="outlined" onClick={toggleDrawer("bottom", true)}>
          Bottom Drawer
        </Button>
        <Button
          variant="contained"
          onClick={() => setState((s) => ({ ...s, persistent: !s.persistent }))}
        >
          Toggle Persistent Drawer
        </Button>
        <Button
          variant="contained"
          onClick={() => setState((s) => ({ ...s, mini: !s.mini }))}
        >
          Toggle Mini Drawer
        </Button>
      </Box>

      {/* Temporary Drawers */}
      {["left", "right", "top", "bottom"].map((anchor) => (
        <Drawer
          key={anchor}
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {drawerContent(`${anchor.charAt(0).toUpperCase() + anchor.slice(1)} Drawer`)}
        </Drawer>
      ))}

      {/* Persistent Drawer (Left) */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={state.persistent}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={() => setState((s) => ({ ...s, persistent: false }))}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        {drawerContent("Persistent Drawer")}
      </Drawer>

      {/* Mini Variant Drawer */}
      <Drawer
        variant="permanent"
        anchor="right"
        open
        sx={{
          width: state.mini ? 72 : 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: state.mini ? 72 : 240,
            boxSizing: "border-box",
            overflowX: "hidden",
            transition: "width 0.3s",
          },
        }}
      >
        {drawerContent(state.mini ? "Mini" : "Expanded")}
      </Drawer>
    </Box>
  );
}
