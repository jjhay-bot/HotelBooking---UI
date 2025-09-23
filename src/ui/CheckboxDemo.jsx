import React from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from '@mui/material';

export default function CheckboxDemo() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Stack spacing={4}>
      {/* ✅ Checked / Default Checked */}
      <div>
        <Typography variant="h6">Checked / DefaultChecked</Typography>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Default Checked"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Default Unchecked"
          />
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            label={`Controlled (${checked ? 'Checked' : 'Unchecked'})`}
          />
        </FormGroup>
      </div>

      {/* ✅ Color Variants */}
      <div>
        <Typography variant="h6">Color Variants</Typography>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox defaultChecked color="primary" />}
            label="Primary"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked color="secondary" />}
            label="Secondary"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked color="error" />}
            label="Error"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked color="info" />}
            label="Info"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked color="success" />}
            label="Success"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked color="warning" />}
            label="Warning"
          />
        </FormGroup>
      </div>

      {/* ✅ Sizes */}
      <div>
        <Typography variant="h6">Sizes</Typography>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Small"
          />
          <FormControlLabel
            control={<Checkbox size="medium" />}
            label="Medium"
          />
        </FormGroup>
      </div>

      {/* ✅ Disabled and Indeterminate */}
      <div>
        <Typography variant="h6">Disabled & Indeterminate</Typography>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox disabled />}
            label="Disabled"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked disabled />}
            label="Checked Disabled"
          />
          <FormControlLabel
            control={<Checkbox indeterminate />}
            label="Indeterminate"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked indeterminate />}
            label="Indeterminate Checked"
          />
        </FormGroup>
      </div>

      {/* ✅ Custom Icons */}
      <div>
        <Typography variant="h6">Custom Icons</Typography>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                icon={
                  <span
                    style={{
                      border: '2px solid gray',
                      width: 18,
                      height: 18,
                      display: 'inline-block',
                      borderRadius: 4,
                    }}
                  />
                }
                checkedIcon={
                  <span
                    style={{
                      backgroundColor: '#1976d2',
                      width: 18,
                      height: 18,
                      display: 'inline-block',
                      borderRadius: 4,
                    }}
                  />
                }
              />
            }
            label="Custom Icon"
          />
        </FormGroup>
      </div>
    </Stack>
  );
}
