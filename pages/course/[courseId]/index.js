import { withUser } from "@hoc/routes";
import { getCourseWithContentAdmin } from "@lib/admin/course";
import { listenOneContent } from "@lib/content";
import { Box, useTheme } from "@mui/material";
import CourseBody from "@page-components/Course/CourseBody";
import { useEffect, useState } from "react";

const Course = ({ course }) => {
  const [data, setData] = useState(course);
  const theme = useTheme();

  useEffect(() => {
    if (course?.id) {
      const unsub = listenOneContent(course?.id, (res) => {
        setData((old) => ({ ...old, ...res }));
      });

      return () => {
        unsub?.();
      };
    }
  }, []);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <CourseBody course={data} />
    </Box>
  );
};

export default Course;

export const getServerSideProps = withUser(async (context, { db, profile }) => {
  try {
    const courseId = context.params.courseId;

    const course = await getCourseWithContentAdmin(db, courseId);

    if (course?.private && !profile?.enrolledCourses?.includes?.(courseId)) {
      return { redirect: { destination: "/content" } };
    }

    return {
      props: { course: course ? JSON.parse(JSON.stringify(course)) : null },
    };
  } catch (error) {
    console.log("Course Error", error);
    return { redirect: { destination: "/content" } };
  }
});
