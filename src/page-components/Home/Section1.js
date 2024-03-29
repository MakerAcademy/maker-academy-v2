import GreenButton from "@components/buttons/GreenButton";
import Title from "@components/Title";
import { NAVBAR_HEIGHT_MOBILE } from "@constants/";
import { useAppSelector } from "@hooks/useRedux";
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
  HomeGraphicImage,
  DoorImage,
} from "@page-components/Home/images";
import { parseLineBreaks } from "@utils/helperFunctions";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";
// import ReactCursorPosition from "react-cursor-position";

const DoorSection = (props) => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("md", "lg"));

  // const {
  //   isActive = false,
  //   position: { x = 0, y = 0 } = {},
  //   elementDimensions: { width = 0, height = 0 } = {},
  // } = props;

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
            // transform: isActive && `translate(${x * -0.08}px, ${y * -0.1}px)`,
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
      </Stack>
    </Fade>
  );
};

const RightImage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100%",
        zIndex: -1,
        [theme.breakpoints.up("md")]: {
          maxHeight: 600,
          position: "absolute",
          right: 0,
          top: 50,
        },
        [theme.breakpoints.up("lg")]: {
          ml: -4,
          right: 10,
          maxHeight: 700,
          top: 70,
        },
        [theme.breakpoints.up("xl")]: {
          right: 30,
          maxHeight: 740,
          top: 70,
        },
      }}
    >
      <img
        src={HomeGraphicImage}
        alt="Home Image"
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </Box>
  );
};

const Section1 = () => {
  const theme = useTheme();
  const { t, lang } = useTranslation("home");

  const { profile } = useAppSelector((state) => state.profile);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
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
            minHeight: 750,
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
                  {parseLineBreaks(t("section1_welcome"))}
                </Title>
              </Fade>

              <Fade direction="down" duration={800} triggerOnce>
                <Typography sx={{ lineHeight: "150%" }}>
                  {t("section1_description")}
                </Typography>
              </Fade>

              <Stack direction="row" spacing={{ xs: 2, md: 4 }} sx={{ pt: 2 }}>
                <Fade direction="down" duration={800} triggerOnce>
                  {profile ? (
                    <Link href="/content" passHref>
                      <GreenButton>{t("section1_view_content")}</GreenButton>
                    </Link>
                  ) : (
                    <Link href="/register" passHref>
                      <GreenButton>{t("section1_join_btn")}</GreenButton>
                    </Link>
                  )}
                </Fade>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Right Side */}
      <Hidden mdDown>
        <RightImage />
      </Hidden>
    </Box>
  );
};

export default Section1;
