import GreenButton from "@components/buttons/GreenButton";
import Title from "@components/Title";
import { NAVBAR_HEIGHT_MOBILE } from "@constants/";
import {
  Box,
  Container,
  Grid,
  Hidden,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  BlurSection1,
  DoorBgImage,
  DoorImage,
} from "@page-components/Home/images";
import { Fade } from "react-awesome-reveal";
import ReactCursorPosition from "react-cursor-position";

const DoorSection = (props) => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("md", "lg"));

  const {
    isActive = false,
    position: { x = 0, y = 0 } = {},
    elementDimensions: { width = 0, height = 0 } = {},
  } = props;

  return (
    <Fade triggerOnce>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          position: "relative",
          width: "100%",
          height: 500,
          [theme.breakpoints.up("lg")]: {
            height: 550,
          },
          "& :hover": {
            "& > img": {
              marginLeft: 0,
            },
          },
        }}
      >
        <img
          src={DoorBgImage}
          alt="Home Image"
          loading="lazy"
          style={{
            height: isMediumScreen ? "700px" : "780px",
            // width: "100%",
            objectFit: "contain",
            zIndex: 1,
            transition: "100ms linear transform",
            marginLeft: "-30px",
            marginTop: "-30px",
            transform: isActive && `translate(${x * -0.08}px, ${y * -0.1}px)`,
          }}
        />

        <img
          src={DoorImage}
          alt="Home Image"
          loading="lazy"
          style={{
            height: "100%",
            // width: "100%",
            objectFit: "contain",
            position: "absolute",
            zIndex: 2,
          }}
        />

        {/* <Image
  src={DoorBgImage}
  alt="Home Image"
  layout="responsive"
  objectFit="contain"
  height="100%"
  width="100%"
  priority
/>
 <Image
  src={DoorImage}
  alt="Home Image"
  layout="responsive"
  objectFit="contain"
  height="100%"
  width="100%"
  priority
/> */}
      </Stack>
    </Fade>
  );
};

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
            px: 10,
            minHeight: "95vh",
          },
          [theme.breakpoints.up("lg")]: {
            pt: `calc(${NAVBAR_HEIGHT_MOBILE}px + 30px)`,
            px: 3,
          },
        }}
      >
        <Grid
          container
          spacing={{ xs: 3, md: 8 }}
          sx={{ my: { xs: 3, lg: 5 } }}
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
              <Fade direction="down" duration={800} triggerOnce>
                <Title
                  variant={{ xs: "h3", md: "h2", xl: "h1" }}
                  sx={{ whiteSpace: "pre-line" }}
                >
                  {"Welcome to the\nMaker Academy"}
                </Title>
              </Fade>

              <Fade direction="down" duration={800} triggerOnce>
                <Typography sx={{ lineHeight: "150%" }}>
                  Your one-stop guide to all things Maker. Whether you are a new
                  trying to understand how MakerDAO works or a contributor
                  looking to help build, we have got everything you need to get
                  started.
                </Typography>
              </Fade>

              <Stack direction="row" spacing={{ xs: 2, md: 4 }} sx={{ pt: 2 }}>
                <Fade direction="down" duration={800} triggerOnce>
                  <GreenButton>JOIN THE ACADEMY</GreenButton>
                </Fade>
              </Stack>
            </Stack>
          </Grid>

          {/* Right Side */}
          <Hidden mdDown>
            <Grid item xs={12} md={5}>
              <ReactCursorPosition>
                <DoorSection />
              </ReactCursorPosition>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </Box>
  );
};

export default Section1;
