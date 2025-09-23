import { useRef, useState, useCallback } from "react";
import { Box, Stack, Button, IconButton, Grid } from "@mui/material";
import Webcam from "react-webcam";
import { CameraButton, CheckIcon, ReloadIcon } from "@assets/Icons";
import { bgcolor } from "@constants";

export default function CameraArea({ onCapture, facingMode = "environment", onSubmit }) {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  // High-res constraints
  const videoConstraints = {
    facingMode,
    width: { ideal: 2560 }, // try to get max resolution possible
    height: { ideal: 1440 },
  };

  const capturePhoto = useCallback(() => {
    if (!webcamRef.current) return;

    const video = webcamRef.current.video;
    const canvas = document.createElement("canvas");

    // Match the preview aspect ratio, but use full resolution
    const previewAspect = video.clientWidth / video.clientHeight;
    const sourceAspect = video.videoWidth / video.videoHeight;

    let sx, sy, sWidth, sHeight;

    if (sourceAspect > previewAspect) {
      // Crop horizontally
      sHeight = video.videoHeight;
      sWidth = sHeight * previewAspect;
      sx = (video.videoWidth - sWidth) / 2;
      sy = 0;
    } else {
      // Crop vertically
      sWidth = video.videoWidth;
      sHeight = sWidth / previewAspect;
      sx = 0;
      sy = (video.videoHeight - sHeight) / 2;
    }

    canvas.width = sWidth;
    canvas.height = sHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);

    const photo = canvas.toDataURL("image/jpeg", 0.95); // 95% quality
    setImage(photo);
    onCapture?.(photo);
  }, [onCapture]);

  const clearPhoto = () => setImage(null);

  const savePhoto = () => {
    if (!image) return;

    // Extract MIME type from data URL
    const mimeType = image.split(";")[0].split(":")[1];

    // Call onSubmit with the image data and mime type
    // onSubmit will handle getting presigned URL and uploading
    onSubmit(image, mimeType);
  };

  return (
    <Stack
      sx={{
        width: "100%",
        flex: 1,
        maxHeight: "100%",
        position: "relative",
        overflowY: "hidden",
      }}
    >
      {!image ? (
        <>
          <Webcam
            ref={webcamRef}
            audio={false}
            mirrored={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            onUserMedia={() => setIsCameraReady(true)} // Set camera ready when stream is available
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <Stack
            position="absolute"
            bottom={36}
            left="50%"
            sx={{ transform: "translateX(-50%)" }}
          >
            <IconButton
              onClick={capturePhoto}
              disabled={!isCameraReady}
              sx={{
                filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.3))",
                "&:hover": {
                  filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.4)) brightness(1.05)",
                  transform: "scale(1.05)",
                },
              }}
            >
              <CameraButton />
            </IconButton>
          </Stack>
        </>
      ) : (
        <Stack flex={1} position="relative">
          <Box
            component="img"
            src={image}
            alt="Captured"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Grid
            container
            position="absolute"
            bottom={0}
            left="50%"
            sx={{
              transform: "translateX(-50%)",
              bgcolor: bgcolor.white,
              width: "100%",
              p: 2,
              px: 3,
              pb: 4,
            }}
            gap={2}
          >
            <Grid size="grow">
              <Button
                variant="outlined"
                size="small"
                startIcon={<ReloadIcon />}
                fullWidth
                onClick={clearPhoto}
              >
                Retake photo
              </Button>
            </Grid>

            <Grid size="grow">
              <Button
                fullWidth
                size="small"
                startIcon={<CheckIcon fill={bgcolor.white} size={16} />}
                onClick={savePhoto}
              >
                Use photo
              </Button>
            </Grid>
          </Grid>
        </Stack>
      )}
    </Stack>
  );
}
