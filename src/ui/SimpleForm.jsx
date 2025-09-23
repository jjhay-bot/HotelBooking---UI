import { Grid, Stack } from "@mui/material";
import { useState } from "react";
import FormAutocomplete from "@components/atoms/FormAutocomplete";
import FormTextField from "@components/atoms/FormTextField";

export default function SimpleForm() {
  const [single, setSingle] = useState(null);
  const [multiple, setMultiple] = useState([]);

  const options = [
    { id: 1, label: "Apple" },
    { id: 2, label: "Banana" },
    { id: 3, label: "Cherry" },
  ];

  return (
    <Stack maxWidth={600}>
      <h3>Custom Autocomplete</h3>

      <FormTextField name="input" value="22" />

      <Grid container>
        <Grid size={{ xs: 6 }}>
          <FormAutocomplete
            name="single"
            options={options}
            value={single}
            onChange={setSingle}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <FormAutocomplete
            name="multiple"
            options={options}
            value={multiple}
            onChange={setMultiple}
            multiple
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
