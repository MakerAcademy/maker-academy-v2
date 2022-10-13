import { withProtectedUser } from "@hoc/routes";
import { getAssessmentWithContentAdmin } from "@lib/admin/assessment";
import { getCourseWithContentAdmin } from "@lib/admin/course";
import { Box, Container, useTheme } from "@mui/material";
import AssessmentPage from "@page-components/Assessment";
import CourseBreadrumbsNav from "@page-components/Course/CourseBreadrumbsNav";
import LearnContentDrawer from "@page-components/Course/LearnContentDrawer";
import ErrorPage from "@page-components/Error";

const LearnContent = ({ course, assessment }) => {
  const theme = useTheme();

  if (!assessment) return <ErrorPage />;

  return (
    <>
      <Box>
        <LearnContentDrawer course={course} />
      </Box>

      <Box
        sx={{
          maxWidth: "100vw",
        }}
      >
        <Container maxWidth="md" sx={{ mt: 8 }}>
          <CourseBreadrumbsNav
            course={course}
            _document={assessment}
            type="assessment"
          />
        </Container>

        <AssessmentPage assessment={assessment} course={course} />

        {/* <NextPreviousButtons course={course} /> */}
      </Box>
    </>
  );
};

export default LearnContent;

export const getServerSideProps = withProtectedUser(
  async (context, { db, profile }) => {
    try {
      const courseId = context.params.courseId;
      const docId = context.params.docId;

      const course = await getCourseWithContentAdmin(db, courseId);

      if (course?.private && !profile?.enrolledCourses?.includes?.(courseId)) {
        return { redirect: { destination: "/content" } };
      }

      const _docFound = Object.values(course?.curriculum).find((item) => {
        return Object.values(item.documents)?.find((j) => j.docId === docId);
      });
      const docFound = _docFound?.documents?.find((j) => j.docId === docId);

      let assessment = {};

      if (docFound) {
        assessment = await getAssessmentWithContentAdmin(db, docId);
      } else {
        return { redirect: { destination: `/course/${courseId}` } };
      }

      return {
        props: {
          course: JSON.parse(JSON.stringify(course)),
          assessment: JSON.parse(JSON.stringify(assessment)),
        },
      };
    } catch (error) {
      console.log("serverside assessment error", error);
      return { props: {} };
      // return { redirect: { destination: "/content" } };
    }
  }
);
