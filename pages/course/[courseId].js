import { Box, useTheme } from "@mui/material";
import CourseBody from "@page-components/Course/CourseBody";
import CourseBreadcrumbs from "@page-components/Course/CourseBreadcrumbs";
import React from "react";

const Course = () => {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <CourseBreadcrumbs />
      <CourseBody />
    </Box>
  );
};

export default Course;
