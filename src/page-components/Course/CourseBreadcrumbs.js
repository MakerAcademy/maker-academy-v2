import { Breadcrumbs } from "@components/Breadcrumbs";
import { NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_MOBILE } from "@constants/";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import {
  Avatar,
  Box,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import moment from "moment";
import React from "react";

const CourseBreadcrumbs = ({
  title = "My Title",
  description = "Aliqua aute exercitation minim duis sunt. Ex non pariatur nulla quis laboris elit Lorem commodo magna consectetur et sunt. Non est veniam nulla aute commodo id ut irure cillum mollit.",
  timestamp,
  level = "Beginner",
  duration = 30,
  username = "makeracademy",
}) => {
  const theme = useTheme();

  return (
    <Breadcrumbs
      large
      sx={{
        pt: `${NAVBAR_HEIGHT_MOBILE}px`,
        [theme.breakpoints.up("md")]: {
          pt: `${NAVBAR_HEIGHT_DESKTOP}px`,
        },
      }}
    >
      <Stack
        justifyContent="flex-start"
        spacing={{ xs: 3, md: 4 }}
        sx={{ py: 3 }}
      >
        <Typography variant="h3">{title}</Typography>

        <Typography sx={{ maxWidth: 650, fontWeight: 300 }}>
          {description}
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          {/* Level */}
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <AssessmentOutlinedIcon fontSize="small" />
            <Typography>{level}</Typography>
          </Stack>

          {/* Duration */}
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <AccessTimeIcon fontSize="small" />
            <Typography>{duration} min</Typography>
          </Stack>
        </Stack>

        <Divider sx={{ maxWidth: 400, backgroundColor: blueGrey[900] }} />

        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar />

          <Box>
            <Typography variant="body2">@{username}</Typography>

            <Typography variant="caption">
              {moment(timestamp).format("LL")}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Breadcrumbs>
  );
};

export default CourseBreadcrumbs;
