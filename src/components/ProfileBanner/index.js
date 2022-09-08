import Title from "@components/Title";
import EmailIcon from "@mui/icons-material/Email";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import LanguageIcon from "@mui/icons-material/Language";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
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

const ProfileBanner = ({
  profilePicture,
  name,
  bio,
  title,
  socials = {},
  profile_link,
  walletAddress,
  sx = {},
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const AddressBox = ({ address }) => (
    <Tooltip title="Copy to clipboard">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        sx={{
          borderRadius: "20px",
          py: 1,
          px: 2,
          backgroundColor: "primary.invert",
          cursor: "pointer",
          "&:hover": {
            color: theme.palette.primary.purple,
          },
          [theme.breakpoints.up("sm")]: {
            maxWidth: 300,
          },
        }}
      >
        <Box
          sx={{
            width: "85%",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {address}
          </Typography>
        </Box>

        <FileCopyIcon fontSize="small" />
      </Stack>
    </Tooltip>
  );

  const SocialLink = ({ children }) => (
    <Button
      variant="outlined"
      sx={{
        width: 40,
        height: 40,
        minWidth: 0,
        borderRadius: "8px",
        bgcolor: "primary.invert",
        border: `1px solid primary.invert`,
      }}
    >
      {children}
    </Button>
  );

  return (
    <Box sx={{ ...sx }}>
      {/* Top */}
      <Box
        sx={{
          color: theme.palette.primary.white,
          bgcolor: "grey.grey2",
          height: 230,
          p: 3,
          borderRadius: "12px 12px 0 0",
          [theme.breakpoints.up("md")]: {
            p: 5,
            pb: 2,
          },
        }}
      >
        {/* Image and name */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ md: "flex-end" }}
          spacing={{ xs: 3, md: 5 }}
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
            <Typography variant="body2">{title}</Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Bottom white */}
      <Box
        sx={{
          bgcolor: "primary.invert",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          height: 50,
        }}
      />

      <Grid container sx={{ pt: 4 }} spacing={5}>
        <Grid item xs={12} md={6}>
          <CustomPaper title="About">
            <Stack spacing={1}>
              <Typography variant="body2">{bio}</Typography>
            </Stack>
          </CustomPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomPaper title="Socials">
            <Stack spacing={1}></Stack>
          </CustomPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileBanner;
