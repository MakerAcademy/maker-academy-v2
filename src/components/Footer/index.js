import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  Container,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { FullLogoBlack, FullLogoWhite } from "@utils/images";
import Link from "next/link";

const socials = [
  { label: "Twitter", icon: TwitterIcon, link: "#", color: "#00acee" },
  { label: "Youtube", icon: YouTubeIcon, link: "#", color: "#c4302b" },
  { label: "LinkedIn", icon: LinkedInIcon, link: "#", color: "#1f8cbf" },
  // { label: "Discord", svg: DiscordIcon, link: "#", color: "#5865F2" },
];

const ABOUT_ROUTES = [
  {
    label: "mission_vision_strategy",
    value: "/about-us/mission-vision-strategy",
  },
  { label: "budget", value: "/about-us/budget" },
  { label: "improvement_proposals", value: "/about-us/imrovement-proposals" },
  { label: "status_updates", value: "/about-us/status-updates" },
  { label: "team", value: "/about-us/team" },
  { label: "privacy_policy", value: "/about-us/privacy-policy" },
  { label: "terms_of_service", value: "/about-us/terms-of-service" },
];

const LandingFooter = ({}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        alignItems="center"
        justifyContent="space-between"
        sx={
          {
            // backgroundColor: "#14005C",
            // color: theme.palette.common.white,
          }
        }
      >
        {/* Logo */}
        <Link href="/" passHref>
          <img
            src={theme.palette.mode === "light" ? FullLogoBlack : FullLogoWhite}
            alt="Maker Academy Logo"
            style={{
              height: "100%",
              maxHeight: "25px",
              objectFit: "contain",
            }}
          />
        </Link>

        {/* Rights */}
        <Typography variant="body2">All rights Maker Academy 2022</Typography>

        {/* Socials */}
        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {socials.map((item, i) => (
            <Link href={item.link} key={i} passHref>
              <IconButton>
                {item.icon && <item.icon fontSize="small" />}

                {/* {item.svg && (
                    <Image
                      src={item.svg}
                      alt="Discord"
                      height="25px"
                      width="25px"
                      objectFit="contain"
                      style={{
                        filter: "invert(0.9)",
                      }}
                    />
                  )} */}
              </IconButton>
            </Link>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export default LandingFooter;
