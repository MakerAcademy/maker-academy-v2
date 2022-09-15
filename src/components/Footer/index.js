import { scrollToTop } from "@components/buttons/ScrollToTop";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GitHubIcon from "@mui/icons-material/GitHub";
import RedditIcon from "@mui/icons-material/Reddit";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link as MUILink,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { BlurSection3 } from "@page-components/Home/images";
import {
  MakerShortLogoBlack,
  MakerShortLogoWhite,
  ShortLogoBlack,
  ShortLogoWhite,
} from "@utils/images";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

const MAKER_SOCIALS = [
  {
    label: "Discord",
    icon: faDiscord,
    link: "https://discord.gg/FAQWbM5p",
    fontAwesome: true,
  },
  {
    label: "Twitter",
    icon: TwitterIcon,
    link: "https://discord.gg/FAQWbM5p",
  },
  {
    label: "Reddit",
    icon: RedditIcon,
    link: "https://discord.gg/FAQWbM5p",
  },
  {
    label: "Youtube",
    icon: YouTubeIcon,
    link: "https://www.youtube.com/watch?v=lupjOrsTs18&t=38s",
  },
  {
    label: "Github",
    icon: GitHubIcon,
    link: "https://www.youtube.com/watch?v=lupjOrsTs18&t=38s",
  },
];

const MA_SOCIALS = [
  {
    label: "Discord",
    icon: faDiscord,
    link: "https://discord.gg/FAQWbM5p",
    fontAwesome: true,
  },
  {
    label: "Twitter",
    icon: TwitterIcon,
    link: "https://discord.gg/FAQWbM5p",
  },
  {
    label: "Youtube",
    icon: YouTubeIcon,
    link: "https://www.youtube.com/watch?v=lupjOrsTs18&t=38s",
  },
];

const ABOUT_ROUTES = [
  {
    label: "mission",
    link: "/about/mission",
  },
  {
    label: "team",
    link: "/about/team",
  },
  {
    label: "backlog",
    link: "/about/backlog",
  },
  {
    label: "status_updates",
    link: "/about/status_updates",
  },
];

const PRODUCT_TOOLS_ROUTES = [
  {
    label: "articles",
    link: "/content?contentType=documents",
  },
  {
    label: "courses",
    link: "/content?contentType=courses",
  },
];

const LandingFooter = ({}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const { t } = useTranslation("common");

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        zIndex: theme.zIndex.drawer + 1,
        position: "relative",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <img
        loading="lazy"
        src={BlurSection3}
        alt="Blur 3"
        style={{
          position: "absolute",
          zIndex: -1,
        }}
      />

      <Container maxWidth="xl" sx={{ pt: 12, pb: 8 }}>
        <Grid container>
          {/* LEFT SIDE */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, mb: 2, color: "text.title" }}
            >
              {t("contact_makerdao")}
            </Typography>

            <Typography variant="body2" sx={{ mb: 2 }}>
              {t("official_community_channels")}
            </Typography>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{ mb: 4.7 }}
            >
              {MAKER_SOCIALS.map((item, i) => {
                if (item.fontAwesome) {
                  return (
                    <IconButton size="small" key={i}>
                      <FontAwesomeIcon
                        icon={item.icon}
                        color={theme.palette.text.title}
                        size="sm"
                      />
                    </IconButton>
                  );
                }

                return (
                  <IconButton key={i} size="small">
                    <item.icon sx={{ color: "text.title" }} fontSize="small" />
                  </IconButton>
                );
              })}
            </Stack>

            <MUILink href="https://makerdao.com/" target="_blank">
              <img
                src={isDark ? MakerShortLogoWhite : MakerShortLogoBlack}
                alt="MakerDAO Logo"
              />
            </MUILink>
          </Grid>

          {/* MIDDLE SIDE */}
          <Grid item xs={12} md={6}>
            <Grid container justifyContent="center">
              <Grid item xs={12} md={6}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, mb: 2, color: "text.title" }}
                >
                  {t("product_tools")}
                </Typography>

                <Stack spacing={2}>
                  {PRODUCT_TOOLS_ROUTES.map((item, i) => (
                    <Link key={i} href={item.link} passHref>
                      <Typography
                        sx={{
                          width: "fit-content",
                          cursor: "pointer",
                          "&:hover": {
                            color: "#A5A5A5",
                          },
                        }}
                      >
                        {t(item.label)}
                      </Typography>
                    </Link>
                  ))}
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, mb: 2, color: "text.title" }}
                >
                  {t("academy_info")}
                </Typography>

                <Stack spacing={2}>
                  {ABOUT_ROUTES.map((item, i) => (
                    <Link key={i} href={item.link} passHref>
                      <Typography
                        sx={{
                          width: "fit-content",
                          cursor: "pointer",
                          "&:hover": {
                            color: "#A5A5A5",
                          },
                        }}
                      >
                        {t(item.label)}
                      </Typography>
                    </Link>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, mb: 2, color: "text.title" }}
            >
              {t("contact_maker_academy_support")}
            </Typography>

            <Typography variant="body2" sx={{ mb: 2 }}>
              Maker Academy
            </Typography>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{ mb: 4.7 }}
            >
              {MA_SOCIALS.map((item, i) => {
                if (item.fontAwesome) {
                  return (
                    <IconButton size="small" key={i}>
                      <FontAwesomeIcon
                        icon={item.icon}
                        color={theme.palette.text.title}
                        size="sm"
                      />
                    </IconButton>
                  );
                }

                return (
                  <IconButton key={i} size="small">
                    <item.icon sx={{ color: "text.title" }} fontSize="small" />
                  </IconButton>
                );
              })}
            </Stack>

            <img
              src={isDark ? ShortLogoWhite : ShortLogoBlack}
              alt="Maker Academy Logo"
              onClick={scrollToTop}
              style={{ cursor: "pointer" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingFooter;
