import { NAVBAR_HEIGHT_DESKTOP } from "@constants/";
import { withProtectedUser } from "@hoc/routes";
import { getCourseWithContent } from "@lib/course";
import { Box } from "@mui/material";

const Learn = () => {
  return (
    <Box sx={{ minHeight: "100vh", mt: `${NAVBAR_HEIGHT_DESKTOP + 20}px` }}>
      Learn
    </Box>
  );
};

export default Learn;

export const getServerSideProps = withProtectedUser(
  async (context, { profile }) => {
    const _id = context.params.id;

    try {
      const courseId = context.params.courseId;

      const course = await getCourseWithContent(courseId);

      if (course?.private && !profile?.enrolledCourses?.includes?.(courseId)) {
        return { redirect: { destination: "/content" } };
      }

      const docId = course?.carriculum?.[0]?.documents?.[0]?.docId;
      return {
        redirect: { destination: `/course/${courseId}/learn/${docId}` },
      };

      return {
        props: { course },
      };
    } catch (error) {
      console.log(1, error);
      return { redirect: { destination: "/content" } };
    }
  }
);
