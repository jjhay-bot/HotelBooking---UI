import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';

export default function CardDemo() {
  return (
    <div style={{ display: 'grid', gap: 24, padding: 32, maxWidth: 800, margin: '0 auto' }}>

      {/* 1. Default Card */}
      <Card>
        <CardContent>
          <Typography variant="h6">Default Card</Typography>
          <Typography>This is a basic card with no variant.</Typography>
        </CardContent>
      </Card>

      {/* 2. Outlined Card */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6">Outlined Card</Typography>
          <Typography>Uses the `outlined` variant.</Typography>
        </CardContent>
      </Card>

      {/* 3. Elevated Card */}
      <Card variant="elevation" elevation={6}>
        <CardContent>
          <Typography variant="h6">Elevated Card</Typography>
          <Typography>Custom elevation level.</Typography>
        </CardContent>
      </Card>

      {/* 4. Card with Header */}
      <Card>
        <CardHeader
          title="Card with Header"
          subheader="Subheader text"
        />
        <CardContent>
          <Typography>This card has a header section.</Typography>
        </CardContent>
      </Card>

      {/* 5. Card with Media */}
      <Card>
        <CardMedia
          component="img"
          height="140"
          image="https://source.unsplash.com/random/800x600"
          alt="Random unsplash"
        />
        <CardContent>
          <Typography variant="h6">Card with Media</Typography>
          <Typography>Includes an image/media section above.</Typography>
        </CardContent>
      </Card>

      {/* 6. Card with Actions */}
      <Card>
        <CardContent>
          <Typography variant="h6">Card with Actions</Typography>
          <Typography>This card has action buttons below.</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Cancel</Button>
          <Button size="small" variant="contained">Confirm</Button>
        </CardActions>
      </Card>

      {/* 7. Interactive / Hoverable Card */}
      <Card
        onClick={() => alert('Card clicked!')}
        sx={{
          cursor: 'pointer',
          '&:hover': {
            boxShadow: 8,
            transform: 'scale(1.02)',
            transition: 'all 0.2s ease-in-out',
          },
        }}
      >
        <CardContent>
          <Typography variant="h6">Interactive Card</Typography>
          <Typography>Hover or click me.</Typography>
        </CardContent>
      </Card>

    </div>
  );
}
