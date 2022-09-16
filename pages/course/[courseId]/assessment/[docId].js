import { NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_MOBILE } from "@constants/";
import { withProtectedUser } from "@hoc/routes";
import { getAssessmentWithContent } from "@lib/assessment";
import { getCourseWithContent } from "@lib/course";
import { Box, useTheme } from "@mui/material";
import AssessmentPage from "@page-components/Assessment";
import ErrorPage from "@page-components/Error";

const LearnContent = ({ course, assessment }) => {
  const theme = useTheme();

  if (!assessment) return <ErrorPage />;

  return (
    <Box
      sx={{
        maxWidth: "100vw",
        position: "relative",
        pt: `${NAVBAR_HEIGHT_MOBILE}px`,
        [theme.breakpoints.up("md")]: {
          pt: `${NAVBAR_HEIGHT_DESKTOP}px`,
        },
      }}
    >
      <AssessmentPage assessment={assessment} />
    </Box>
  );
};

export default LearnContent;

export const getServerSideProps = withProtectedUser(
  async (context, { profile }) => {
    try {
      const courseId = context.params.courseId;
      const docId = context.params.docId;

      const course = await getCourseWithContent(courseId);

      if (course?.private && !profile?.enrolledCourses?.includes?.(courseId)) {
        return { redirect: { destination: "/content" } };
      }

      const _docFound = Object.values(course?.carriculum).find((item) => {
        return Object.values(item.documents)?.find((j) => j.docId === docId);
      });
      const docFound = _docFound?.documents?.find((j) => j.docId === docId);

      let assessment = {};

      if (docFound) {
        assessment = await getAssessmentWithContent(docId);
      } else {
        // return { redirect: { destination: `/course/${courseId}` } };
      }

      return {
        props: {
          course: JSON.parse(JSON.stringify(course)),
          assessment: JSON.parse(JSON.stringify(assessment)),
        },
      };
    } catch (error) {
      console.log(1, error);
      return { redirect: { destination: "/content" } };
    }
  }
);
