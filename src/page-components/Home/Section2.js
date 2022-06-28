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
  BooksSec2Icon,
  darkOutlineSec2Icon,
  GlobeSec2Icon,
  lightOutlineSec2Icon,
  PenSec2Icon,
  ScrollSec2Icon,
} from "@page-components/Home/images";

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

const ServiceCard = ({ title, description, image, Btn }) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={(theme) => ({
        zIndex: 999,
        height: "100%",
        minHeight: 320,
        p: { xs: 3, md: 5 },
        borderRadius: 3,
        boxShadow: "10px 12px 80px rgba(126, 129, 164, 0.2)",
        background:
          theme.palette.mode === "light"
            ? "linear-gradient(335deg, rgba(245,252,239,1) 13%, rgba(250,255,247,1) 38%, rgba(255,255,255,1) 100%)"
            : "linear-gradient(335deg, rgba(20,20,20,1) 0%, rgba(0,0,0,1) 65%)",
      })}
    >
      <Grid
        container
        justifyContent="space-between"
        sx={{ height: "100%", gap: "20px" }}
        flexWrap={{ xs: "wrap-reverse", sm: "wrap" }}
      >
        {/* Left */}
        <Grid item xs={12} sm={8}>
          <Stack
            spacing={2}
            justifyContent="space-between"
            sx={{ height: "100%" }}
          >
            <Stack spacing={2}>
              <Typography variant="h3" sx={{ fontSize: "32px" }}>
                {title}
              </Typography>

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
        <Grid item xs={12} sm={"auto"}>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <img
              src={
                theme.palette.mode === "light"
                  ? lightOutlineSec2Icon
                  : darkOutlineSec2Icon
              }
              alt="outline"
              style={{ zIndex: 1, height: 123, width: 123 }}
            />
            <img
              src={image}
              alt="outline"
              style={{
                position: "absolute",
                zIndex: 2,
                height: 110,
                width: 110,
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

const Section2 = () => {
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

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Grid container spacing={3}>
          {/* Item 1 */}
          <Grid item xs={12} md={6}>
            <ServiceCard
              title={"What is Maker Academy?"}
              description={"Learn about Maker Academy"}
              image={BooksSec2Icon}
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
              image={ScrollSec2Icon}
              Btn={
                <ActionButton
                  text="LEARN MORE"
                  Icon={ArrowForwardOutlinedIcon}
                />
              }
            />
          </Grid>

          {/* Item 3 */}
          <Grid item xs={12} md={6}>
            <ServiceCard
              title={"Contribute"}
              description={
                "Want to add your own content?\nContribute to the Academy using the creator studio"
              }
              image={PenSec2Icon}
              Btn={
                <ActionButton
                  text="START CREATING"
                  Icon={ArrowForwardOutlinedIcon}
                />
              }
            />
          </Grid>

          {/* Item 4 */}
          <Grid item xs={12} md={6}>
            <ServiceCard
              title={"Find your role at Maker"}
              description={
                "Want to contribute to MakerDAO?\nSee how you can get involved"
              }
              image={GlobeSec2Icon}
              Btn={
                <ActionButton
                  text="VIEW ROLES"
                  Icon={ArrowForwardOutlinedIcon}
                />
              }
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Section2;
