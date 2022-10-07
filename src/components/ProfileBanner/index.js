import Title from "@components/Title";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import WorkIcon from "@mui/icons-material/Work";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { MakerShortLogoBlack, MakerShortLogoWhite } from "@utils/images";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

const dummyTabs = ["all", "content", "programs"];

const CustomPaper = ({ title, children }) => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 3, md: 4 },
      borderRadius: "16px",
      bosShadow: "0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
    }}
  >
    <Title sx={{ mb: 3 }}>{title}</Title>
    {children}
  </Paper>
);

const SocialLink = ({ href = "#", Icon, text, disabled, color, ...other }) => (
  <Button
    href={href}
    target="_blank"
    sx={{ width: "fit-content", minWidth: 115 }}
    disabled={!!disabled}
    {...other}
  >
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      spacing={1}
      sx={{ width: "100%" }}
    >
      <Icon
        fontSize="small"
        sx={{ color: disabled ? "grey.grey3" : color || "text.primary" }}
      />
      <Typography
        variant="body2"
        sx={{ color: disabled ? "grey.grey3" : "text.primary" }}
      >
        {text}
      </Typography>
    </Stack>
  </Button>
);

const ProfileBanner = ({
  coverPicture,
  profilePicture,
  name,
  bio,
  title,
  role,
  socials = {},
  profile_link,
  walletAddress,
  sx = {},
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [tabValue, setTabValue] = useState(0);

  const { t } = useTranslation("common");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ ...sx }}>
      {/* Top */}
      <Box
        sx={{
          color: theme.palette.primary.white,
          bgcolor: "grey.grey2",
          height: 230,
          p: 3,
          position: "relative",
          borderRadius: "12px 12px 0 0",
          [theme.breakpoints.up("md")]: {
            p: 5,
            pb: 2,
          },
        }}
      >
        <Box
          sx={{
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            //   bgcolor: "red",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {coverPicture ? (
            <img
              src={coverPicture}
              alt="Cover Photo"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          ) : (
            <></>
          )}
        </Box>

        {/* Image and name */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ md: "flex-end" }}
          spacing={{ xs: 3, md: 5 }}
          sx={{ height: "100%", zIndex: 999 }}
        >
          <Avatar
            src={profilePicture}
            sx={{
              height: 140,
              width: 140,
              [theme.breakpoints.up("md")]: { mb: -6 },
              border: `4px solid ${theme.palette.grey.grey2}`,
            }}
          />

          <Stack>
            <Title variant="h5">{name}</Title>
            <Typography variant="body2">{role}</Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Bottom white */}
      <Box
        sx={{
          borderTop: `4px solid ${theme.palette.grey.grey2}`,
          bgcolor: "primary.invert",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          height: 50,
        }}
      />

      <Grid container sx={{ pt: 4 }} spacing={5}>
        <Grid item xs={12} md={6}>
          <CustomPaper title="About">
            <Stack spacing={1.5}>
              <Typography variant="body2">{bio}</Typography>

              <SocialLink
                href={`mailto:${socials?.publicEmail}`}
                Icon={EmailIcon}
                text={socials?.publicEmail}
                disabled={!socials?.publicEmail}
              />

              <SocialLink
                // href={`mailto:${socials?.publicEmail}`}
                Icon={WorkIcon}
                text={t(role)}
              />
            </Stack>
          </CustomPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomPaper title="Socials">
            <Stack spacing={1.5}>
              <Button
                href={`https://forum.makerdao.com/u/${socials?.makerforum}`}
                target="_blank"
                sx={{ width: "fit-content", minWidth: 115 }}
              >
                <img
                  src={!isDark ? MakerShortLogoBlack : MakerShortLogoWhite}
                  alt="Maker Logo"
                  style={{
                    width: "24px",
                    objectFit: "contain",
                    filter:
                      !socials?.makerforum &&
                      "invert(99%) sepia(0%) saturate(741%) hue-rotate(205deg) brightness(119%) contrast(95%)",
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    ml: 1,
                    color: !socials?.makerforum ? "grey.grey3" : "text.primary",
                  }}
                >
                  {socials?.makerforum}
                </Typography>
              </Button>

              <SocialLink
                href={`https://www.instagram.com/${socials?.instagram}`}
                Icon={InstagramIcon}
                text={socials?.instagram}
                disabled={!socials?.instagram}
                color="#CA295F"
              />
              <SocialLink
                href={`https://www.linkedin.com/${socials?.linkedin}`}
                Icon={LinkedInIcon}
                text={socials?.linkedin}
                disabled={!socials?.linkedin}
                color="#0e76a8"
              />
              <SocialLink
                href={`https://www.linkedin.com/${socials?.twitter}`}
                Icon={TwitterIcon}
                text={socials?.twitter}
                disabled={!socials?.twitter}
                color="#00ACEE"
              />
            </Stack>
          </CustomPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileBanner;
