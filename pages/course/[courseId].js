import { Box, useTheme } from "@mui/material";
import CourseBody from "@page-components/Course/CourseBody";

const Course = () => {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <CourseBody />
    </Box>
  );
};

export default Course;
