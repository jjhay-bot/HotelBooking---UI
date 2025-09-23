import { useState, useRef, useEffect } from "react";
import { CheckIcon, CloseIcon, SearchIcon } from "@assets/Icons";
import { bgcolor, color } from "@constants";
import { useModal } from "@hooks/useModal";
import { Clear } from "@mui/icons-material";
import {
  SwipeableDrawer,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  IconButton,
  Grid,
  Divider,
  InputAdornment,
  Stack,
} from "@mui/material";

export default function ActionDrawer({
  children,
  onSelect,
  defaulOptions,
  name,
  disabled,
}) {
  const searchRef = useRef(null);

  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState({ id: 2 });

  const { open, onClose, openModal } = useModal();

  const onInputChange = (e) => {
    const input = e.target.value || "";

    setSearch(input);

    const filteredOptions = defaulOptions.filter((opt) =>
      new RegExp(input, "i").test(opt.label),
    );

    setOptions(input?.length ? filteredOptions : defaulOptions);
  };

  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
      setOptions(defaulOptions);
      setSearch("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const [highlightIndex, setHighlightIndex] = useState(0);

  const handleKeyDown = (e) => {
    if (!options.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev - 1 + options.length) % options.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = options[highlightIndex];
      if (opt) {
        setSelected(opt);
        onSelect({ [name]: opt.id });
        onClose();
      }
    }
  };

  return (
    <>
      <Box onClick={openModal}>{children}</Box>

      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        onOpen={openModal}
        disableSwipeToOpen
        slotProps={{
          paper: {
            sx: {
              // height: "100%",
              height: "100dvh",
              backgroundColor: "transparent",
              boxShadow: "none",
              borderRadius: 0,
              maxWidth: 440,
              margin: "auto",
            },
          },
        }}
        sx={{
          display: disabled ? "none" : "flex",
        }}
      >
        {/* Card container starting at 300px from top */}
        <Box
          sx={{
            position: "absolute",
            top: 260,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "#fff",
            borderRadius: "24px 24px 0 0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Handle bar */}
          <Box
            sx={{
              width: 40,
              height: 4,
              background: "#ccc",
              borderRadius: 2,
              mx: "auto",
              my: 1,
            }}
          />

          {/* Title */}
          <Grid container className="centered">
            <Grid sx={{ position: "absolute", top: 20, left: 10 }}>
              <IconButton size="small" onClick={onClose}>
                <CloseIcon fill={color.mid} />
              </IconButton>
            </Grid>

            <Typography variant="h4" sx={{ pt: 1.25, textAlign: "center" }}>
              Select province
            </Typography>
          </Grid>

          {/* Search input */}
          <Box sx={{ px: 2, py: 1 }}>
            <TextField
              focused
              fullWidth
              inputRef={searchRef}
              placeholder="Search Province"
              variant="outlined"
              color="search"
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ mx: 2 }} className="red" />
                    </InputAdornment>
                  ),
                  endAdornment: search && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearch("")} edge="start">
                        <Clear fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              value={search}
              onChange={onInputChange}
              onKeyDown={handleKeyDown}
            />
          </Box>

          <Divider />

          {/* Scrollable options */}
          <Box sx={{ overflowY: "auto", flex: 1 }}>
            <List disablePadding>
              {options.map((opt, ind) => (
                <ListItemButton
                  key={opt.id}
                  // selected={opt.id === selected?.id}
                  selected={opt.id === selected?.id || ind === highlightIndex}
                  onClick={() => {
                    setSelected(opt);
                    onSelect({ [name]: opt.id });
                    onClose();
                  }}
                >
                  <ListItemText primary={opt.label} />
                  {opt.id === selected?.id && <CheckIcon />}
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
