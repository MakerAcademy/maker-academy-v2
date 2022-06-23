import DiscordIcon from "@assets/icons/discord-brand.svg";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const socials = [
  { label: "Twitter", icon: TwitterIcon, link: "#", color: "#00acee" },
  { label: "Youtube", icon: YouTubeIcon, link: "#", color: "#c4302b" },
  { label: "LinkedIn", icon: LinkedInIcon, link: "#", color: "#1f8cbf" },
  { label: "Discord", svg: DiscordIcon, link: "#", color: "#5865F2" },
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
    <Box
      sx={{
        py: 6,
        px: 4,
        backgroundColor: "#14005C",
        color: theme.palette.common.white,
      }}
    >
      {/* About Routes */}
      <Typography
        variant="h5"
        sx={{ textAlign: "center", fontWeight: 400, pb: { xs: 2, md: 3 } }}
      >
        About Us
      </Typography>

      <Stack
        spacing={2}
        direction={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
      >
        {ABOUT_ROUTES.map((route, i) => (
          <Link href={route.value} key={i} passHref>
            <Typography
              sx={{
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {route.label}
            </Typography>
          </Link>
        ))}
      </Stack>

      {/* Socials */}
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: 400,
          pb: { xs: 2, md: 3 },
          pt: { xs: 3, md: 5 },
        }}
      >
        Socials
      </Typography>

      <Stack
        spacing={2}
        direction={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
      >
        {socials.map((item, i) => (
          <Link href={item.link} key={i} passHref>
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.5}
              sx={{
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              <IconButton
                sx={{
                  backgroundColor: item.color,
                  color: theme.palette.common.white,
                }}
              >
                {item.icon && <item.icon fontSize="small" />}

                {item.svg && (
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
                )}
              </IconButton>
            </Stack>
          </Link>
        ))}
      </Stack>
    </Box>
  );
};

export default LandingFooter;
