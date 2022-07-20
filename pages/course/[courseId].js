import { NAVBAR_HEIGHT_DESKTOP } from "@constants/";
import { Box, useTheme } from "@mui/material";
import CourseBody from "@page-components/Course/CourseBody";

const Course = () => {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: "100vh", mt: `${NAVBAR_HEIGHT_DESKTOP + 20}px` }}>
      <CourseBody />
    </Box>
  );
};

export default Course;
