import Title from "@components/Title";
import { Avatar, Box, Button, Card, Stack, Typography } from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MdCtaBox = ({ data }) => {
  const {
    title,
    description,
    image = "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
    buttonText = "Learn More",
    buttonLink = "#",
  } = data;

  return (
    <Stack alignItems="center" sx={{ py: 2 }}>
      <Card sx={{ p: 3, maxWidth: 500, borderRadius: "16px" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={{ xs: 3, md: 5 }}
        >
          {/* Left side */}
          <Stack spacing={2}>
            <Title>{title}</Title>

            <Typography variant="body2">{description}</Typography>

            <Box>
              <Button href={buttonLink} target="_blank" size="small">
                <Typography variant="body2">{buttonText}</Typography>
                <ArrowForwardIcon fontSize="small" sx={{ ml: 1 }} />
              </Button>
            </Box>
          </Stack>

          {/* Right Side */}
          <Avatar src={image} sx={{ height: 120, width: 120 }} />
        </Stack>
      </Card>
    </Stack>
  );
};

export default MdCtaBox;
