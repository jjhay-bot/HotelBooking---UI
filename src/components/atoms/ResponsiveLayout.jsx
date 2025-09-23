import { Grid, Stack } from "@mui/material";

/**
 * @typedef {import('@mui/material').StackProps} StackProps
 * @typedef {import('react').ReactNode} ReactNode
 */
/**
 * A responsive layout component that provides a consistent structure with a header, content, and footer.
 * It extends the MUI Stack component, so all Stack props can be used directly.
 *
 * @param {StackProps & {
 *   children: ReactNode,
 *   top?: ReactNode,
 * }} props
 * @returns {JSX.Element}
 */

const ResponsiveLayout = ({ children, top, ...props }) => {
  return (
    <Stack
      {...props}
      sx={{
        height: "100%",
      }}
    >
      {/* Top section takes content height */}
      <Stack flexShrink={0} justifyContent="center">
        {top}
      </Stack>

      {/* Scrollable section */}
      <Stack
        flexGrow={1}
        sx={{
          overflowY: "auto",
          // maxWidth: "100%",
          // width: "100%",
          height: "100%",
          pb: 2,
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default ResponsiveLayout;
