import { NAVBAR_HEIGHT_DESKTOP } from "@constants/";
import { withUser } from "@hoc/routes";
import { listenOneContent } from "@lib/content";
import { getCourseWithContent } from "@lib/course";
import { Box, useTheme } from "@mui/material";
import CourseBody from "@page-components/Course/CourseBody";
import { useEffect, useState } from "react";

const Course = ({ course }) => {
  const [data, setData] = useState(course);
  const theme = useTheme();

  useEffect(() => {
    const unsub = listenOneContent(course?.id, (res) => {
      setData((old) => ({ ...old, ...res }));
    });

    return () => {
      unsub?.();
    };
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", mt: `${NAVBAR_HEIGHT_DESKTOP + 20}px` }}>
      <CourseBody course={data} />
    </Box>
  );
};

export default Course;

export const getServerSideProps = withUser(async (context, { profile }) => {
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
