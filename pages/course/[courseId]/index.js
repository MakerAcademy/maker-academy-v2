import { NAVBAR_HEIGHT_DESKTOP } from "@constants/";
import { withUser } from "@hoc/routes";
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

export const getServerSideProps = withUser(async (context, { profile }) => {
  const _id = context.params.id;

  try {
    const courseId = context.params.courseId;

    const course = await getCourseWithContent(courseId);

    if (course?.private && !profile?.enrolledCourses?.includes?.(courseId)) {
      return { redirect: { destination: "/content" } };
    }

    return {
      props: { course },
    };
  } catch (error) {
    console.log(1, error);
    return { redirect: { destination: "/content" } };
  }
});
