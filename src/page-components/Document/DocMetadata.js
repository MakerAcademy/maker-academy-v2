import { useAppSelector } from "@hooks/useRedux";
import { likeDocument, unlikeDocument } from "@lib/document";
import DescriptionIcon from "@mui/icons-material/Description";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TimerIcon from "@mui/icons-material/Timer";
import { Button, Grid, Stack, Typography } from "@mui/material";
import moment from "moment";
import useTranslation from "next-translate/useTranslation";
import React from "react";

const DocMetadata = ({
  id,
  level,
  timestamp,
  updatedTimestamp,
  duration,
  likes,
  views,
  ...other
}) => {
  const { t } = useTranslation("content");
  const { profile } = useAppSelector((state) => state.profile);

  const hasUserLiked = profile?.likedContent?.includes?.(id);

  const triggerLike = () => {
    if (!hasUserLiked) {
      likeDocument(id, profile?.id);
    } else {
      unlikeDocument(id, profile?.id);
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={{ xs: 2, md: 3, lg: 4 }}
    >
      <Grid
        container
        direction="row"
        flexWrap="wrap"
        alignItems="center"
        spacing={{ xs: 1, md: 3, lg: 4 }}
      >
        {/* Difficulty */}
        <Grid item>
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{
              px: 1,
              py: 0.5,
              backgroundColor: "rgba(249,166,6,0.1)",
              color: "rgba(249,166,6)",
              borderRadius: 2,
            }}
          >
            <DescriptionIcon sx={{ fontSize: 17 }} />
            <Typography variant="body2">{t(level)}</Typography>
          </Stack>
        </Grid>

        {/* Timestamps */}
        <Grid item>
          <Typography variant="body2">
            {t("published")} {moment(timestamp?.toDate?.()).format("ll")}
          </Typography>
        </Grid>

        {/* {updatedTimestamp && (
          <Typography variant="body2">
            Updated {moment(updatedTimestamp).format("ll")}
          </Typography>
        )} */}

        {/* Duration */}
        <Grid item>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <TimerIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2">
              {duration} {t("minutes")}
            </Typography>
          </Stack>
        </Grid>

        {/* Likes */}
        <Grid item>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <FavoriteIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2">
              {likes || 0} {t("likes")}
            </Typography>
          </Stack>
        </Grid>
      </Grid>

      {/* Buttons */}
      {profile?.id && (
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 2, md: 3 }}
        >
          {/* <Button size="small">
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <EditIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">Edit</Typography>
            </Stack>
          </Button> */}

          <Button size="small" onClick={triggerLike}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              {hasUserLiked ? (
                <FavoriteIcon sx={{ fontSize: 18 }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: 18 }} />
              )}
              <Typography variant="body2">
                {hasUserLiked ? t("unlike") : t("like")}
              </Typography>
            </Stack>
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default React.memo(DocMetadata);
