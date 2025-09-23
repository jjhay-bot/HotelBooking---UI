import { Box, Typography } from "@mui/material";

const TypographyDemo = () => {
  return (
    <Box sx={{ padding: 4, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h1">h1 - Heading 1</Typography>
      <Typography variant="h2">h2 - Heading 2</Typography>
      <Typography variant="h3">h3 - Heading 3</Typography>
      <Typography variant="h4">h4 - Heading 4</Typography>
      <Typography variant="h5">h5 - Heading 5</Typography>
      <Typography variant="h6">h6 - Heading 6</Typography>

      <Box mt={4}>
        <Typography variant="subtitle1">subtitle1 - Subtitle primary</Typography>
        <Typography variant="subtitle2">subtitle2 - Subtitle secondary</Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="body1">
          body1 - This is standard body text. Use for most content and paragraphs. Lorem
          ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>
        <Typography variant="body2" mt={2}>
          body2 - Slightly smaller body text, good for secondary information or long-form
          notes.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="caption">
          caption - This is a caption or annotation
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="overline">overline - Overline label</Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="button">button - Button text style</Typography>
      </Box>
    </Box>
  );
};

export default TypographyDemo;
