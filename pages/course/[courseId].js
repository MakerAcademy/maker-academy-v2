import { NAVBAR_HEIGHT_DESKTOP } from "@constants/";
import { getCourseWithContent } from "@lib/course";
import { Box, useTheme } from "@mui/material";
import CourseBody from "@page-components/Course/CourseBody";

const Course = ({ course }) => {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: "100vh", mt: `${NAVBAR_HEIGHT_DESKTOP + 20}px` }}>
      <CourseBody course={course} />
    </Box>
  );
};

export default Course;

export async function getServerSideProps(context) {
  const courseId = context.params.courseId;

  const course = await getCourseWithContent(courseId);

  return {
    props: { course },
  };
}
