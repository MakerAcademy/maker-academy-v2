import CourseDocument from "@components/Document/CourseDocument";
import { withProtectedUser } from "@hoc/routes";
import { getCourseWithContentAdmin } from "@lib/admin/course";
import { getDocumentWithContentAdmin } from "@lib/admin/document";
import { Box, Container, Stack, useTheme } from "@mui/material";
import CourseBreadrumbsNav from "@page-components/Course/CourseBreadrumbsNav";
import LearnContentDrawer from "@page-components/Course/LearnContentDrawer";
import NextPreviousButtons from "@page-components/Course/NextPreviousButtons";
import ErrorPage from "@page-components/Error";

const LearnContent = ({ course, document: _document }) => {
  const theme = useTheme();

  const contentType = _document?.contentType;

  if (!contentType) return <ErrorPage />;

  return (
    <Stack direction="row">
      <LearnContentDrawer course={course} />

      <Box sx={{ width: "100%" }}>
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Box sx={{ mb: 3 }}>
            <CourseBreadrumbsNav course={course} _document={_document} />
          </Box>

          <CourseDocument data={_document} hideScrollspy />

          <NextPreviousButtons course={course} />
        </Container>
      </Box>
    </Stack>
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

      let document = {};

      if (docFound) {
        document = await getDocumentWithContentAdmin(db, docId);
      } else {
        return { redirect: { destination: `/course/${courseId}` } };
      }

      return {
        props: {
          course: JSON.parse(JSON.stringify(course)),
          document: JSON.parse(JSON.stringify(document?.response)),
        },
      };
    } catch (error) {
      console.log(1, error);
      return { redirect: { destination: "/content" } };
    }
  }
);
