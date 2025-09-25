import { Grid, Typography, Divider } from "@mui/material";
import Tagline from "../molecules/Tagline";
import { taglines } from "@/data/taglines";
import QuickActions from "../molecules/QuickActions";

const DefaultHeader = ({ title = "", backAction = true }) => {
  return (
    <Grid
      container
      sx={{
        alignItems: "center",
      }}
    >
      <Grid sx={{ display: backAction ? "block" : "none", px: 1, pt: 3 }}>
        <Divider color="#706b3b" sx={{ my: "1px" }} />
        <Divider color="#706b3b" sx={{ my: "1px" }} />

        <Grid container alignItems="center" justifyContent="space-between" spacing={0.5}>
          <Grid size="grow">
            <Typography variant="logo" color="#706b3b">
              Bedder Deals
              <Grid container>
                <Tagline taglines={taglines} />
              </Grid>
            </Typography>
          </Grid>

          <Grid>
            <QuickActions />
          </Grid>
        </Grid>

        <Divider color="#706b3b" sx={{ my: "1px" }} />
        <Divider color="#706b3b" sx={{ my: "1px" }} />
      </Grid>

      <Grid px={1}>
        <Typography variant="h5">{title}</Typography>
      </Grid>
    </Grid>
  );
};

export default DefaultHeader;
