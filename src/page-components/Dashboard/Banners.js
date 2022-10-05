import Title from "@components/Title";
import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

const LIGHT_TRANSPARENCY = "1A";
const DARK_TRANSPARENCY = "33";

const CustomCard = ({
  title,
  description,
  image = "https://static.vecteezy.com/system/resources/previews/001/204/727/non_2x/pencil-png.png",
  buttonText,
  color,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 4,
        height: "100%",
        width: "100%",
        backgroundColor: `${color}${
          theme.palette.mode === "light"
            ? LIGHT_TRANSPARENCY
            : DARK_TRANSPARENCY
        }`,
        borderRadius: 5,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <Stack spacing={2} alignItems="flex-start">
          <Title variant="h6">{title}</Title>

          <Typography variant="body2">{description}</Typography>

          <Button sx={{ color, textTransform: "inherit", p: 0 }}>
            {buttonText}
            <ArrowForwardOutlinedIcon sx={{ ml: 1, fontSize: 18 }} />
          </Button>
        </Stack>

        <img
          src={image}
          alt={title}
          style={{
            height: "100%",
            maxHeight: 100,
            objectFit: "contain",
          }}
        />
      </Stack>
    </Box>
  );
};

const Banners = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <CustomCard
          title="MakerDAO History "
          description="Start here if you're new to MakerDAO and the Academy."
          buttonText="Learn More"
          color="#1AAB9B"
        />
      </Grid>
 
      <Grid item xs={12} md={6}>
        <CustomCard
          title="Get rewarded for learning"
          description="Get started with a beginner course and learn how our stable coin DAI works."
          buttonText="Start Course"
          color="#FF9800"
        />
      </Grid>
    </Grid>
  );
};

export default Banners;
