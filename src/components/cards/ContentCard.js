import GreenButton from "@components/buttons/GreenButton";
import Title from "@components/Title";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { blue, green, red, yellow } from "@mui/material/colors";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const StyledRibbon = styled(Box)(({ theme }) => ({
  position: "absolute",
  overflow: "hidden",
  color: "white",
  width: 120,
  height: 120,
  zIndex: 3,
  top: -5,
  right: -5,

  "& > p": {
    left: 0,
    top: 20,
    transform: "rotate(45deg)",
    position: "absolute",
    display: "block",
    width: 160,
    whiteSpace: "pre-line",
    padding: "3px 0",
    backgroundColor: "#f5c562",
    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.192)",
    color: "#fff",
    textShadow: "0 1px 1px rgba(0,0,0,.2)",
    textTransform: "uppercase",
    textAlign: "center",
    border: "2px dotted #fff",
    outline: "4px solid  #f5c562",
  },
}));

const ContentCard = ({
  _id,
  thumbnail = "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.png",
  title,
  shortDescription,
  username,
  topic,
  duration,
  contentType,
  level,
  timestamp,
  brand,
  views = 0,
  likes = 0,
}) => {
  const theme = useTheme();

  const [isHovered, setIsHovered] = useState(false);

  const LikesViews = ({ sx, text, Icon, iconSize = 18 }) => (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.5}
      sx={{
        position: "absolute",
        py: 0.5,
        px: 1,
        borderRadius: 2,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        ...sx,
      }}
    >
      <Icon sx={{ fontSize: iconSize }} />
      <Typography>{text}</Typography>
    </Stack>
  );

  const setHover = (e, val) => {
    e.preventDefault();
    setIsHovered(!!val);
  };

  const Badge = ({ text }) => {
    return (
      <Box
        sx={{
          position: "absolute",
          top: 30,
          left: 0,
          backgroundColor: "primary.main",
          py: 1,
          px: 2,
          minWidth: 80,
          clipPath: "polygon(0% 0%, 85% 0, 100% 49%, 85% 99%, 0% 100%)",
        }}
      >
        <Typography variant="body2" sx={{ color: theme.palette.common.white }}>
          {text}
        </Typography>
      </Box>
    );
  };

  return (
    <Link
      href={contentType === "documents" ? `/document/${_id}` : `/course/${_id}`}
      passHref
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: "16px",
          width: "100%",
          height: "100%",
          cursor: "pointer",
          transition: "all .4s ease",
          background:
            theme.palette.mode === "dark"
              ? theme.palette.background.gradient1
              : theme.palette.background.paper,
          boxShadow:
            "0px 0px 1px rgba(12, 26, 75, 0.24), 0px 3px 8px -1px rgba(50, 50, 71, 0.05)",
          "&:hover": {
            transform: "translateY(-10px)",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          },
        }}
        onMouseEnter={(e) => setHover(e, true)}
        onMouseLeave={(e) => setHover(e, false)}
      >
        {/* Image */}
        <Box sx={{ position: "relative", height: 180, width: "100%" }}>
          <Box
            sx={{ position: "absolute", height: "100%", width: "100%", p: 2 }}
          >
            <img
              loading="lazy"
              src={thumbnail}
              alt={title}
              style={{
                objectFit: "cover",
                height: "100%",
                width: "100%",
                borderRadius: "16px",
              }}
            />
          </Box>

          {/* Brand */}
          {brand && <Badge text={brand} />}
        </Box>

        {/* Content */}
        <CardContent sx={{ pt: 0 }}>
          <Title variant="h6">{title}</Title>

          {shortDescription && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              {shortDescription}
            </Typography>
          )}

          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 2, width: "100%" }}
            flexWrap="wrap"
          >
            {/* Type */}
            {contentType === "document" ? (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <FeedOutlinedIcon sx={{ fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontSize: 14 }}>
                  Document
                </Typography>
              </Stack>
            ) : (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <SubscriptionsOutlinedIcon sx={{ fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontSize: 14 }}>
                  Course
                </Typography>
              </Stack>
            )}

            {/* Duration */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <AccessTimeIcon sx={{ fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontSize: 14 }}>
                {duration} min
              </Typography>
            </Stack>

            {/* Level */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.5}
              sx={{ color: yellow[900] }}
            >
              <AssessmentOutlinedIcon sx={{ fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontSize: 14 }}>
                {level}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ContentCard;
