import GreenButton from "@components/buttons/GreenButton";
import Title from "@components/Title";
import { NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_MOBILE } from "@constants/";
import {
  Box,
  Container,
  Grid,
  Hidden,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  BlurSection1,
  DoorBgImage,
  DoorImage,
} from "@page-components/Home/images";
import Image from "next/image";
import { Fade, Slide } from "react-awesome-reveal";

const Section1 = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        // backgroundColor: "red",
        [theme.breakpoints.up("md")]: {},
      }}
    >
      <img
        loading="lazy"
        src={BlurSection1}
        alt="Blur 1"
        style={{
          maxWidth: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />

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
        <Grid
          container
          spacing={{ xs: 3, md: 8 }}
          sx={{ my: { xs: 3, md: 5 } }}
        >
          {/* Left Side */}
          <Grid item xs={12} md={7}>
            <Stack
              spacing={4}
              justifyContent="center"
              alignItems={{ xs: "center", md: "flex-start" }}
              sx={{
                height: "100%",
                [theme.breakpoints.down("md")]: { textAlign: "center" },
              }}
            >
              <Fade triggerOnce direction="left">
                <Title variant={{ xs: "h2", md: "h1" }}>
                  Welcome to the Maker Academy
                </Title>
              </Fade>

              <Fade triggerOnce direction="right">
                <Typography sx={{ lineHeight: "150%" }}>
                  Your one-stop guide to all things Maker. Whether you are a new
                  trying to understand how MakerDAO works or a contributor
                  looking to help build, we have got everything you need to get
                  started.
                </Typography>
              </Fade>

              <Stack direction="row" spacing={{ xs: 2, md: 4 }} sx={{ pt: 2 }}>
                <Fade triggerOnce direction="left" delay={300}>
                  <GreenButton>JOIN THE ACADEMY</GreenButton>
                </Fade>
              </Stack>
            </Stack>
          </Grid>

          {/* Right Side */}
          <Hidden mdDown>
            <Grid item xs={12} md={5}>
              <Fade triggerOnce>
                <Box
                  // justifyContent="center"
                  // alignItems="center"
                  sx={{
                    width: "100%",
                    height: 550,
                    "& > span": { height: "100% !important" },
                  }}
                >
                  {/* <img
                    src={DoorBgImage}
                    alt="Home Image"
                    loading="lazy"
                    style={{
                      height: "800px",
                      // width: "100%",
                      objectFit: "contain",
                      zIndex: 1,
                    }}
                  />

                  <img
                    src={DoorImage}
                    alt="Home Image"
                    loading="lazy"
                    style={{
                      height: "500px",
                      // width: "100%",
                      objectFit: "contain",
                      position: "absolute",
                      zIndex: 2,
                    }}
                  /> */}

                  {/* <Image
                    src={DoorBgImage}
                    alt="Home Image"
                    layout="responsive"
                    objectFit="contain"
                    height="100%"
                    width="100%"
                    priority
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
              </Fade>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </Box>
  );
};

export default Section1;
