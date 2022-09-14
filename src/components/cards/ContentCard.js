import { CONTENT_CARD_BRAND_STYLES } from "@constants/index";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import {
  Box,
  CardContent,
  Chip,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { yellow } from "@mui/material/colors";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useState } from "react";
import ContentBrandBanner from "@assets/images/misc/contentBrandBanenr.svg";
import FeedIcon from "@mui/icons-material/Feed";

const BrandBadge = ({ name, text }) => {
  const theme = useTheme();

  const _item = CONTENT_CARD_BRAND_STYLES[name];

  const _logo = CONTENT_CARD_BRAND_STYLES[name].logo || text;

  return (
    <Box sx={{ position: "absolute", bottom: 10, left: 0 }}>
      <Box sx={{ position: "relative" }}>
        <img
          src={ContentBrandBanner}
          alt="banner"
          style={{
            minHeight: "35px",
            minWidth: "120px",
            position: "relative",
            top: 0,
            left: 0,
          }}
        />

        <img
          src={_logo}
          alt={text}
          style={{
            position: "absolute",
            top: "25%",
            left: "48%",
            transform: "translate(-50%, 0%)",
            height: "100%",
            width: "100%",
            maxHeight: "17px",
            objectFit: "contain",
          }}
        />
      </Box>
    </Box>
  );
};

const ContentCard = ({
  id,
  username,
  topic,
  contentType,
  timestamp,
  views = 0,
  likes = 0,
  metadata = {},
}) => {
  const theme = useTheme();
  const { t } = useTranslation("content");

  const {
    title,
    shortDescription,
    brand,
    level,
    duration,
    category,
    thumbnail = "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.png",
  } = metadata;

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

  return (
    <Link
      href={contentType === "document" ? `/document/${id}` : `/course/${id}`}
      passHref
    >
      <Stack
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
        {/* Image container */}
        <Box sx={{ position: "relative", height: 160, width: "100%" }}>
          {/* Image */}
          <Box sx={{ position: "absolute", height: "100%", width: "100%" }}>
            <img
              loading="lazy"
              src={thumbnail}
              alt={title}
              style={{
                objectFit: "cover",
                height: "100%",
                width: "100%",
                borderTopRightRadius: "16px",
                borderTopLeftRadius: "16px",
              }}
            />
          </Box>

          {/* Brand */}
          {brand && brand !== "none" && (
            <BrandBadge name={brand} text={t(brand)} />
          )}

          {/* Category */}
          <Chip
            label={t(category)}
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              bgcolor: "background.dark",
              color: "common.white",
              borderRadius: 1,
            }}
          />

          {/* Likes */}
          <Chip
            label={`${likes || 0} ${t("likes")}`}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              bgcolor: "common.white",
              color: "background.dark",
              borderRadius: 1,
            }}
          />
        </Box>

        {/* Content */}
        <CardContent sx={{ flex: 1 }}>
          <Stack sx={{ height: "100%", gap: "12px" }}>
            {/* Title */}
            <Typography
              sx={{ fontWeight: 500, lineHeight: "25px", color: "text.title" }}
            >
              {title}
            </Typography>

            {/* Description */}
            {shortDescription && (
              <Box sx={{ flex: 1 }}>
                <Tooltip
                  title={shortDescription?.length > 55 ? shortDescription : ""}
                  placement="right"
                >
                  <Typography
                    sx={{
                      fontWeight: 400,
                      maxHeight: 44,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      lineClamp: 2,
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {shortDescription}
                  </Typography>
                </Tooltip>
              </Box>
            )}

            {/* Meta data */}
            <Stack
              direction="row"
              spacing={1}
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 1, width: "100%" }}
              flexWrap="wrap"
            >
              {/* Type */}
              {contentType === "document" ? (
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <FeedIcon sx={{ fontSize: 22 }} />
                  <Typography variant="body2" sx={{ pt: 0.15 }}>
                    {t("article")}
                  </Typography>
                </Stack>
              ) : (
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <SubscriptionsOutlinedIcon sx={{ fontSize: 22 }} />
                  <Typography variant="body2" sx={{ pt: 0.15 }}>
                    {t("course")}
                  </Typography>
                </Stack>
              )}

              {/* Duration */}
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <AccessTimeIcon sx={{ fontSize: 22 }} />
                <Typography variant="body2" sx={{ pt: 0.15 }}>
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
                <AssessmentOutlinedIcon sx={{ fontSize: 22 }} />
                <Typography variant="body2" sx={{ pt: 0.15 }}>
                  {t(level)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Stack>
    </Link>
  );
};

export default ContentCard;
