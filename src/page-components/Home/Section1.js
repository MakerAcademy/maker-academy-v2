import GreenButton from "@components/buttons/GreenButton";
import themeTypography from "@config/theme/typography";
import { NAVBAR_HEIGHT_DESKTOP } from "@constants/";
import { NAVBAR_HEIGHT_MOBILE } from "@constants/";
import {
  Box,
  Button,
  Container,
  Grid,
  Hidden,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import DoorImage from "@assets/images/homepage/door.png";
import Blur1 from "@assets/images/homepage/bg-blur1.png";

const Section1 = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        // backgroundColor: "red",
        [theme.breakpoints.up("md")]: {},
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          pt: `${NAVBAR_HEIGHT_MOBILE}px`,
          [theme.breakpoints.up("md")]: {
            pt: `calc(${theme.spacing(2)} + ${NAVBAR_HEIGHT_DESKTOP}px)`,
            minHeight: "100vh",
          },
        }}
      >
        <Grid container spacing={8} sx={{ my: { xs: 3, md: 5 } }}>
          {/* Left Side */}
          <Grid item xs={12} md={7}>
            <Stack spacing={4} justifyContent="center" sx={{ height: "100%" }}>
              <Typography
                sx={{
                  ...themeTypography.h2,
                  [theme.breakpoints.up("md")]: {
                    ...themeTypography.h1,
                  },
                }}
              >
                Welcome to the Maker Academy
              </Typography>

              <Typography sx={{ lineHeight: "150%" }}>
                Your one-stop guide to all things Maker. Whether you are a new
                trying to understand how MakerDAO works or a contributor looking
                to help build, we have got everything you need to get started.
              </Typography>

              <Stack direction="row" spacing={{ xs: 2, md: 4 }} sx={{ pt: 2 }}>
                <GreenButton>JOIN THE ACADEMY</GreenButton>
              </Stack>
            </Stack>
          </Grid>

          {/* Right Side */}
          <Hidden mdDown>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  width: "100%",
                  height: 550,
                  "& > span": { height: "100% !important" },
                  filter: `drop-shadow(5px 5px 10px ${
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(0,0,0,0.2)"
                  })`,
                }}
              >
                {/* <img
                  src={DoorImage}
                  alt="Home Image"
                  loading="lazy"
                  style={{
                    height: '700px',
                    width: "100%",
                    objectFit: "contain",
                  }}
                /> */}

                <Image
                  src={DoorImage}
                  alt="Home Image"
                  layout="responsive"
                  objectFit="contain"
                  height="100%"
                  width="100%"
                  priority
                />
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </Box>
  );
};

export default Section1;
