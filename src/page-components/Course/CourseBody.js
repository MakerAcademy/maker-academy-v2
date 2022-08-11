import Title from "@components/Title";
import { useAppSelector } from "@hooks/useRedux";
import { enrollToCourse } from "@lib/course";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Container,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import hex from "@utils/hexTransparency";
import Router from "next/router";
import { useState } from "react";
import Content from "./ContentTab";
import Overview from "./OverviewTab";

const CourseBody = ({ course = {} }) => {
  const [tabValue, setTabValue] = useState(0);
  const { profile } = useAppSelector((state) => state.profile);

  const theme = useTheme();
  const {
    title,
    description,
    category,
    brand,
    level,
    duration,
    likes,
    views,
    enrolledUsers,
    carriculum,
    id,
  } = course;

  // console.log(course);

  const isUserEnrolled = profile?.enrolledCourses?.includes?.(id);

  const handleClick = async () => {
    const _route = `/course/${id}/learn`;
    if (isUserEnrolled) {
      Router.push(_route);
    } else {
      enrollToCourse(id, profile?.id).then((res) => {
        Router.push(_route);
      });
    }
  };

  return (
    <Box sx={{ my: 5 }}>
      {/* Content */}
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Box spacing={2}>
          {/* Breadcrumbs */}
          <Typography sx={{ mb: 2 }}>{`Home > Courses > ${title}`}</Typography>

          {/* Image */}
          <Paper
            sx={{
              mb: 4,
              height: 240,
              borderRadius: "24px",
              boxShadow:
                "0px 8px 18px -6px rgba(24, 39, 75, 0.12), 0px 12px 42px -4px rgba(24, 39, 75, 0.12)",
            }}
          ></Paper>

          {/* Title */}
          <Title variant={{ xs: "h4", md: "h2" }} sx={{ mb: 2 }}>
            {title}
          </Title>

          <Tabs
            value={tabValue}
            onChange={(e, v) => setTabValue(v)}
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              mb: 5,
              "& .MuiButtonBase-root": {
                mr: 1.5,
                borderRadius: "12px",
                textTransform: "inherit",
                color: grey[700],
                backgroundColor: `${theme.palette.primary.grey1}`,
                fontWeight: 400,
              },
              "& .Mui-selected": {
                color: theme.palette.primary.main,
                backgroundColor: `${theme.palette.primary.main}${hex["10%"]}`,
              },
            }}
          >
            <Tab label="Overview" />
            <Tab label="Course content" />
          </Tabs>

          {/* <Divider /> */}

          <Box sx={{ my: 5 }}>
            {tabValue === 0 && <Overview course={course} />}

            {tabValue === 1 && <Content course={course} />}
          </Box>
        </Box>
      </Container>

      {/* Start */}
      {profile?.id && (
        <Button
          fullWidth
          variant="contained"
          onClick={handleClick}
          sx={{
            py: 3,
            color: "#fff",
            borderRadius: 0,
          }}
        >
          <Typography variant="h6">
            {isUserEnrolled ? "Open Course" : "Start this course"}
          </Typography>
          <ArrowForwardIcon sx={{ ml: 1 }} />
        </Button>
      )}
    </Box>
  );
};

export default CourseBody;
