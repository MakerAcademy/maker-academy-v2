import Title from "@components/Title";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Avatar,
  Card,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Router from "next/router";

const ProfileCard = ({
  id,
  firstName,
  lastName,
  socials,
  title = "Student",
  profilePicture,
  email,
}) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        px: 2,
        py: 1,
        position: "relative",
        boxShadow: "0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        borderRadius: "16px",
        cursor: "pointer",
      }}
      onClick={() => Router.push(`/u/${id}`)}
    >
      <IconButton
        sx={{ position: "absolute", top: 10, right: 10 }}
        size="small"
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>

      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{
          minHeight: 250,
        }}
      >
        <Avatar src={profilePicture} sx={{ height: 64, width: 64 }} />

        <Title>
          {firstName} {lastName}
        </Title>

        <Typography variant="body2">{title}</Typography>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          {socials?.facebook && (
            <IconButton
              size="small"
              sx={{ color: "#4267B2" }}
              href={`https://www.facebook.com/${socials.facebook}`}
              target="_blank"
            >
              <FacebookIcon fontSize="small" />
            </IconButton>
          )}

          {socials?.instagram && (
            <IconButton
              size="small"
              sx={{ color: "#CA295F" }}
              href={`https://www.instagram.com/${socials.instagram}`}
              target="_blank"
            >
              <InstagramIcon fontSize="small" />
            </IconButton>
          )}

          {socials?.linkedin && (
            <IconButton
              size="small"
              sx={{ color: "#0e76a8 " }}
              href={`https://www.linkedin.com/${socials.linkedin}`}
              target="_blank"
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
          )}

          {socials?.twitter && (
            <IconButton
              size="small"
              sx={{ color: "#00ACEE" }}
              href={`https://www.twitter.com/${socials.twitter}`}
              target="_blank"
            >
              <TwitterIcon fontSize="small" />
            </IconButton>
          )}

          {socials?.publicEmail && (
            <IconButton
              size="small"
              href={`mailto:${socials.publicEmail}`}
              target="_blank"
            >
              <AlternateEmailIcon fontSize="small" />
            </IconButton>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProfileCard;
