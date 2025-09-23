import { Grid, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BackIcon } from "@assets/Icons";

const DefaultHeader = ({ title = "", backAction = true }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Grid
      container
      sx={{
        height: "56px",
        alignItems: "center",
      }}
    >
      <Grid sx={{ display: backAction ? "block" : "none", px: 1 }}>
        <IconButton size="small" onClick={goBack}>
          <BackIcon />
        </IconButton>
      </Grid>

      <Grid px={1}>
        <Typography variant="h5">{title}</Typography>
      </Grid>
    </Grid>
  );
};

export default DefaultHeader;
