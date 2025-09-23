import { Divider, Stack, Button } from "@mui/material";

/**
 * @param {import('@mui/material').ButtonProps & {
 * action: import { useNavigate } from 'react-router-dom';
 * title: string }} props
 */

const Footer = ({ title = "Continue", action = () => {}, ...props }) => {
  return (
    <Stack flex={1}>
      <Divider orientation="horizontal" />

      <Stack
        sx={{
          p: 2,
          pb: 3.75,
          pt: 1.25,
        }}
      >
        <Button fullWidth onClick={action} {...props}>
          {title}
        </Button>
      </Stack>
    </Stack>
  );
};

export default Footer;
