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
import { BlurSection1, DoorImage } from "@page-components/Home/images";
import Image from "next/image";

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
              <Title variant={{ xs: "h2", md: "h1" }}>
                Welcome to the Maker Academy
              </Title>

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
                  filter: `drop-shadow(5px 5px 30px ${
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(0,0,0,0.15)"
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
