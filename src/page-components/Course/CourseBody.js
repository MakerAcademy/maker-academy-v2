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
import { useContext, useState } from "react";
import Content from "./ContentTab";
import Overview from "./OverviewTab";
import DefaultCourseImage from "@assets/images/misc/course-default.png";
import CourseBreadcrumbs from "./CourseBreadcrumbs";
import CourseMetadata from "./CourseMetadata";
import { CommonContext } from "@context/commonContext";
import { AuthorInBanner } from "@components/Document";

const CourseBody = ({ course = {} }) => {
  const theme = useTheme();
  const [disabled, setDisabled] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { profile } = useAppSelector((state) => state.profile);
  const { setCommonState } = useContext(CommonContext);

  const {
    title,
    description,
    category,
    metadata,
    level,
    duration,
    likes,
    views,
    enrolledUsers,
    author,
    carriculum,
    learningOutcomes = [],
    id,
  } = course;

  const isUserEnrolled = profile?.enrolledCourses?.includes?.(id);

  const handleClick = async () => {
    setDisabled(true);

    if (!profile?.id) {
      return Router.push("/login");
    }

    const _first = metadata.allDocuments?.[0];

    const _route = `/course/${id}/${
      _first?.contentType === "assessment" ? "assessment" : "learn"
    }/${_first?.docId || ""}`;

    if (isUserEnrolled) {
      Router.push(_route);
    } else {
      setCommonState({
        loadingOverlay: ["Enrolling..."],
      });

      setTimeout(() => {
        setCommonState({ loadingOverlay: null });
        enrollToCourse(id, profile?.id).then((res) => {
          Router.push(_route);
        });
      }, 3000);
    }
  };

  return (
    <Box sx={{ my: 5 }}>
      {/* Content */}
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Box spacing={2}>
          {/* Breadcrumbs */}
          <CourseBreadcrumbs title={title} />

          {/* Image */}
          <Paper
            sx={{
              mb: 4,
              height: 180,
              borderRadius: "24px",
              position: "relative",
              boxShadow:
                "0px 8px 18px -6px rgba(24, 39, 75, 0.12), 0px 12px 42px -4px rgba(24, 39, 75, 0.12)",
              [theme.breakpoints.up("md")]: {
                height: 240,
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 20,
                left: 20,
                bgcolor: "grey.grey9",
                color: "text.invert",
                py: 1,
                px: 1.2,
                borderRadius: "6px",
              }}
            >
              <Typography variant="body2">{category}</Typography>
            </Box>

            <img
              src={metadata?.thumbnail || DefaultCourseImage}
              alt="Course Thumbnail"
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: "inherit",
              }}
            />

            <AuthorInBanner author={author} brand={metadata?.brand} />
          </Paper>

          <Box sx={{ mb: 2 }}>
            <CourseMetadata {...course} />
          </Box>

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
                backgroundColor: `${theme.palette.grey.grey1}`,
                fontWeight: 300,
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
      <Button
        fullWidth
        variant="contained"
        disabled={disabled}
        onClick={handleClick}
        sx={{
          py: 3,
          color: "#fff",
          borderRadius: 0,
          cursor: disabled ? "wait" : "pointer",
        }}
      >
        {profile?.id ? (
          <Typography variant="h6">
            {isUserEnrolled ? "Open Course" : "Start this course"}
          </Typography>
        ) : (
          <Typography variant="h6">{"Sign in to start this course"}</Typography>
        )}
        <ArrowForwardIcon sx={{ ml: 1 }} />
      </Button>
    </Box>
  );
};

export default CourseBody;
