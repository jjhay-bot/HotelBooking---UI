import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { rooms } from "../data/rooms";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

export default function Invite() {
  const { roomId } = useParams();
  const room = rooms.find((r) => r.id === parseInt(roomId));

  if (!room) {
    return (
      <Container>
        <Typography variant="h6" color="error" sx={{ mt: 4 }}>
          Room not found.
        </Typography>
      </Container>
    );
  }

  const pageTitle = `Invitation to Book: ${room.roomType}`;
  const pageDescription = `✨ ${room.roomType} | 👥 ${room.capacity} people | 💰 $${room.pricePerNight}/night. ${room.description}`;
  const imageUrl = room.gallery[0].img;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="Bedder Deals" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="product:price:amount" content={String(room.pricePerNight)} />
        <meta property="product:price:currency" content="USD" />
        <meta property="product:availability" content={room.status} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={imageUrl} />
      </Helmet>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          You're Invited to Book a Room
        </Typography>
        <Card>
          <CardMedia
            component="img"
            height="300"
            image={imageUrl}
            alt={room.gallery[0].alt}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {room.roomType}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {room.description}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">
                <strong>Price:</strong> ${room.pricePerNight} / night
              </Typography>
              <Typography variant="subtitle1">
                <strong>Capacity:</strong> {room.capacity} people
              </Typography>
              <Typography variant="subtitle1">
                <strong>Bed Type:</strong> {room.bedType}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Size:</strong> {room.size}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
