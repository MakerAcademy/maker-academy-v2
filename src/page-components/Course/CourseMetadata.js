import { useAppSelector } from "@hooks/useRedux";
import { likeCourse, unlikeCourse } from "@lib/course";
import DescriptionIcon from "@mui/icons-material/Description";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TimerIcon from "@mui/icons-material/Timer";
import { Button, Stack, Typography } from "@mui/material";
import moment from "moment";

const CourseMetadata = ({ id, level, timestamp, duration, likes, views }) => {
  const { profile } = useAppSelector((state) => state.profile);

  // console.log(timestamp);

  const hasUserLiked = !!profile?.likedContent?.includes?.(id);

  const triggerLike = () => {
    if (!hasUserLiked) {
      likeCourse(id, profile?.id);
    } else {
      unlikeCourse(id, profile?.id);
    }
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems="center"
      justifyContent="space-between"
      spacing={{ xs: 2, md: 3, lg: 4 }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        spacing={{ xs: 2, md: 3, lg: 4 }}
      >
        {/* Difficulty */}
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
          <Typography variant="body2">{level}</Typography>
        </Stack>

        {/* Timestamps */}
        <Typography variant="body2">
          Published {moment(timestamp?.toDate?.()).format("ll")}
        </Typography>

        {/* Duration */}
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <TimerIcon sx={{ fontSize: 18 }} />
          <Typography variant="body2">{duration} mins</Typography>
        </Stack>

        {/* Likes */}
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <FavoriteIcon sx={{ fontSize: 18 }} />
          <Typography variant="body2">{likes || 0} likes</Typography>
        </Stack>
      </Stack>

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
                {hasUserLiked ? "unlike" : "like"}
              </Typography>
            </Stack>
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default CourseMetadata;
