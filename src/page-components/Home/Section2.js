import Title from "@components/Title";
import { YOUTUBE_DEMO_LINK } from "@constants/index";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogContent,
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
import useTranslation from "next-translate/useTranslation";
import Router from "next/router";
import { useState } from "react";
import { Slide } from "react-awesome-reveal";
import ReactPlayer from "react-player";

const ActionButton = ({ text, Icon, reverse, ...other }) => (
  <Button {...other}>
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
  btnText,
  BtnIcon,
  reverse,
  direction = "left",
  delay = 0,
  btnProps = {},
}) => {
  const [hover, setHover] = useState(false);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{ height: "100%" }}
      onMouseEnter={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(false)}
    >
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
            boxShadow: isDark
              ? "10px 12px 80px rgba(126, 129, 164, 0)"
              : "10px 12px 80px rgba(126, 129, 164, 0.2)",
            background: theme.palette.background.gradient1,
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

                {btnText && (
                  <Box>
                    <ActionButton
                      text={btnText}
                      Icon={BtnIcon}
                      reverse={reverse}
                      {...btnProps}
                    />
                  </Box>
                )}
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
                    transform: `scale(${hover ? "1.1" : "1"})`,
                    transition: "all .3s ease-in-out",
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
  const [demoDialogOpen, setDemoDialogOpen] = useState(false);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const { t } = useTranslation("home");

  return (
    <Box
      sx={{
        position: "relative",
        my: 10,
        maxWidth: "100vw",
        overflowX: "clip",
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
              title={t("section2_what_is_maker")}
              description={t("section2_learn_about_maker")}
              image={isDark ? Service1DarkIcon : Service1LightIcon}
              btnText={t("section2_play_video")}
              BtnIcon={PlayArrowOutlinedIcon}
              reverse
              btnProps={{
                onClick: () => setDemoDialogOpen(true),
              }}
            />
          </Grid>

          {/* Item 2 */}
          <Grid item xs={12} md={6}>
            <ServiceCard
              title={t("section2_advance_knowledge")}
              description={t("section2_tailored_programs")}
              image={isDark ? Service2DarkIcon : Service2LightIcon}
              btnText={t("section2_learn_more")}
              BtnIcon={ArrowForwardOutlinedIcon}
              direction="right"
              btnProps={{
                onClick: () => Router.push("/content"),
              }}
            />
          </Grid>

          {/* Item 3 */}
          <Grid item xs={12} md={6}>
            <ServiceCard
              title={t("section2_contribute")}
              description={t("section2_add_your_content")}
              image={isDark ? Service3DarkIcon : Service3LightIcon}
              // btnText={t("section2_start_creating")}
              // BtnIcon={ArrowForwardOutlinedIcon}
              delay={100}
              btnProps={{
                onClick: () => Router.push("/content"),
              }}
            />
          </Grid>

          {/* Item 4 */}
          <Grid item xs={12} md={6}>
            <ServiceCard
              title={t("section2_role_at_maker")}
              description={t("section2_want_to_contribute")}
              image={isDark ? Service4DarkIcon : Service4LightIcon}
              // btnText={t("section2_view_roles")}
              // BtnIcon={ArrowForwardOutlinedIcon}
              direction="right"
              delay={100}
              btnProps={{
                onClick: () => Router.push("/content"),
              }}
            />
          </Grid>
        </Grid>
      </Container>

      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        onClose={() => setDemoDialogOpen(false)}
        open={demoDialogOpen}
        BackdropProps={{ sx: { backgroundColor: "rgba(0,0,0,0.7)" } }}
        PaperProps={{
          elevation: 0,
          sx: {
            background: "transparent",
          },
        }}
      >
        <DialogContent>
          <ReactPlayer
            url={YOUTUBE_DEMO_LINK}
            width="100%"
            height={500}
            playing
            controls
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Section2;
