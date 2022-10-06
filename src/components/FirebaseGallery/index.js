import Title from "@components/Title";
import { getAllImagesInFolder } from "@lib/storage";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FirebaseGallery = ({ storageRef, handleSelect, ButtonComponent }) => {
  const [images, setImages] = useState(null);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const handleOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const selectImage = (_url) => {
    handleSelect?.(_url);
    handleClose();
  };

  useEffect(() => {
    if (storageRef) {
      getAllImagesInFolder(storageRef).then((res) => {
        setImages(res);
      });
    }
  }, [storageRef]);

  return (
    <div>
      {ButtonComponent ? (
        <ButtonComponent onClick={handleOpen} />
      ) : (
        <Button onClick={handleOpen}>Open</Button>
      )}

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Box sx={{ py: 3, px: 5 }}>
          <Stack direction="row" alignItems="center">
            <Title sx={{ flex: 1, textAlign: "center" }}>Select Image</Title>

            <IconButton onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>

          <Divider sx={{ mt: 3, mb: 4 }} />

          <Grid container spacing={3}>
            {images?.map((url, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <Box
                  onClick={() => selectImage(url)}
                  sx={{
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => setHover(url)}
                  onMouseLeave={(e) => setHover(false)}
                >
                  <img
                    src={url}
                    alt="Gallery Image"
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                      filter: hover === url && "brightness(50%)",
                    }}
                  />

                  {hover === url && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "45%",
                        left: "50%",
                        transform: "translate(-50%, 0%)",
                        color: "white",
                      }}
                    >
                      <Typography>Click to Select Image</Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Dialog>
    </div>
  );
};

export default FirebaseGallery;
