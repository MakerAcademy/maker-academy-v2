import Title from "@components/Title";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
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

  const name =
    firstName || lastName ? `${firstName} ${lastName}` : email?.split("@")?.[0];

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
        transition: "all .4s ease",
        "&:hover": {
          transform: "translateY(-7px)",
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px",
        },
      }}
      onClick={() => Router.push(`/u/${id}`)}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: 250,
        }}
      >
        <Avatar src={profilePicture} sx={{ height: 68, width: 68, mb: 2 }} />

        <Title sx={{ mb: 1 }}>{name}</Title>

        <Typography variant="body2" sx={{ mb: 1.5 }}>
          {title}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <IconButton
            size="small"
            sx={{
              color: socials?.facebook
                ? "#4267B2"
                : `${theme.palette.grey.grey2} !important`,
            }}
            href={`https://www.facebook.com/${socials?.facebook}`}
            target="_blank"
            disabled={!socials?.facebook}
            onClick={(e) => e.stopPropagation()}
          >
            <FacebookIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            sx={{
              color: socials?.instagram
                ? "#CA295F"
                : `${theme.palette.grey.grey2} !important`,
            }}
            href={`https://www.instagram.com/${socials?.instagram}`}
            target="_blank"
            disabled={!socials?.instagram}
            onClick={(e) => e.stopPropagation()}
          >
            <InstagramIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            sx={{
              color: socials?.linkedin
                ? "#0e76a8"
                : `${theme.palette.grey.grey2} !important`,
            }}
            href={`https://www.linkedin.com/${socials?.linkedin}`}
            target="_blank"
            disabled={!socials?.linkedin}
            onClick={(e) => e.stopPropagation()}
          >
            <LinkedInIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            sx={{
              color: socials?.twitter
                ? "#00ACEE"
                : `${theme.palette.grey.grey2} !important`,
            }}
            href={`https://www.twitter.com/${socials?.twitter}`}
            target="_blank"
            disabled={!socials?.twitter}
            onClick={(e) => e.stopPropagation()}
          >
            <TwitterIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            href={`mailto:${socials?.publicEmail}`}
            target="_blank"
            disabled={!socials?.publicEmail}
            onClick={(e) => e.stopPropagation()}
            sx={{
              color: socials?.publicEmail
                ? "primary.main"
                : `${theme.palette.grey.grey2} !important`,
            }}
          >
            <AlternateEmailIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProfileCard;
