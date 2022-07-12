import Title from "@components/Title";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  BlurSection2,
  Service1DarkIcon,
  Service1LightIcon,
  Service2DarkIcon,
  Service2LightIcon,
  Service3DarkIcon,
  Service3LightIcon,
  Service4DarkIcon,
  Service4LightIcon,
} from "@page-components/Home/images";
import { Slide } from "react-awesome-reveal";

const ActionButton = ({ text, Icon, reverse }) => (
  <Button>
    <Stack
      spacing={1}
      direction="row"
      alignItems="center"
      justifyContent="center"
      flexWrap={reverse ? "wrap-reverse" : "wrap"}
    >
      {reverse && <Icon />}

      <Typography variant="body2" sx={{ height: 20 }}>
        {text}
      </Typography>

      {!reverse && <Icon />}
    </Stack>
  </Button>
);

const ServiceCard = ({
  title,
  description,
  image,
  Btn,
  direction = "left",
  delay = 0,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ height: "100%" }}>
      <Slide
        direction={direction}
        delay={delay}
        triggerOnce
        style={{ height: "100%" }}
      >
        <Card
          elevation={0}
          sx={{
            zIndex: 999,
            height: "100%",
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            boxShadow: "10px 12px 80px rgba(126, 129, 164, 0.2)",
            background:
              theme.palette.mode === "light"
                ? "linear-gradient(335deg, rgba(245,252,239,1) 13%, rgba(250,255,247,1) 38%, rgba(255,255,255,1) 100%)"
                : "linear-gradient(335deg, rgba(20,20,20,1) 0%, rgba(0,0,0,1) 65%)",
          }}
        >
          <Grid
            container
            justifyContent="space-between"
            sx={{
              textAlign: "center",
              minHeight: `calc(300px - ${theme.spacing(6)})`,
              height: "100%",
              gap: "20px",
              [theme.breakpoints.up("md")]: {
                textAlign: "start",
                minHeight: `calc(300px - ${theme.spacing(10)})`,
              },
            }}
            flexWrap={{ xs: "wrap-reverse", md: "wrap" }}
          >
            {/* Left */}
            <Grid item xs={12} sm={12} md={7} lg={8}>
              <Stack
                spacing={2}
                justifyContent="space-between"
                sx={{ height: "100%" }}
              >
                <Stack spacing={2}>
                  <Title
                    variant={{ xs: "h4", lg: "h3" }}
                    sx={{ fontSize: "32px" }}
                  >
                    {title}
                  </Title>

                  <Typography sx={{ whiteSpace: "pre-line" }}>
                    {description}
                  </Typography>
                </Stack>

                <Box>
                  {Btn}
                  {/* <Btn /> */}
                </Box>
              </Stack>
            </Grid>

            {/* Right */}
            <Grid item xs={12} sm={12} md={"auto"} lg={"auto"}>
              <Stack
                justifyContent="center"
                alignItems="center"
                sx={{ height: "100%" }}
              >
                <img
                  src={image}
                  alt="outline"
                  style={{
                    zIndex: 1,
                    height: 110,
                    width: 110,
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </Slide>
    </Box>
  );
};

const Section2 = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        position: "relative",
        my: 10,
        // maxWidth: "100vh",
        // overflowX: "hidden",
      }}
    >
      <img
        loading="lazy"
        src={BlurSection2}
        alt="Blur 2"
        style={{
          maxWidth: "100%",
          position: "absolute",
          top: -200,
          right: 0,
          zIndex: -1,
          filter: "blur(100px)",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          [theme.breakpoints.up("md")]: {
            px: 10,
          },
          [theme.breakpoints.up("lg")]: {
            px: 3,
          },
        }}
      >
        <Grid container spacing={3}>
          {/* Item 1 */}
          <Grid item xs={12} md={6}>
            <ServiceCard
              title={"What is Maker Academy?"}
              description={"Learn about Maker Academy"}
              image={isDark ? Service1DarkIcon : Service1LightIcon}
              Btn={
                <ActionButton
                  text="PLAY VIDEO"
                  Icon={PlayArrowOutlinedIcon}
                  reverse
                />
              }
            />
          </Grid>

          {/* Item 2 */}
          <Grid item xs={12} md={6}>
            <ServiceCard
              title={"Advance Knowledge"}
              description={
                "Tailored programs for subfields of maker that take you from the basics all the way to the advanced"
              }
              image={isDark ? Service2DarkIcon : Service2LightIcon}
              Btn={
                <ActionButton
                  text="LEARN MORE"
                  Icon={ArrowForwardOutlinedIcon}
                />
              }
              direction="right"
            />
          </Grid>

          {/* Item 3 */}
          <Grid item xs={12} md={6}>
            <ServiceCard
              title={"Contribute"}
              description={
                "Want to add your own content?\nContribute to the Academy using the creator studio"
              }
              image={isDark ? Service3DarkIcon : Service3LightIcon}
              Btn={
                <ActionButton
                  text="START CREATING"
                  Icon={ArrowForwardOutlinedIcon}
                />
              }
              delay={100}
            />
          </Grid>

          {/* Item 4 */}
          <Grid item xs={12} md={6}>
            <ServiceCard
              title={"Find your role at Maker"}
              description={
                "Want to contribute to MakerDAO?\nSee how you can get involved"
              }
              image={isDark ? Service4DarkIcon : Service4LightIcon}
              Btn={
                <ActionButton
                  text="VIEW ROLES"
                  Icon={ArrowForwardOutlinedIcon}
                />
              }
              direction="right"
              delay={100}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Section2;
