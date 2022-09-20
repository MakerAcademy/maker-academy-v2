import CourseDocument from "@components/Document/CourseDocument";
import { withProtectedUser } from "@hoc/routes";
import { getCourseWithContent } from "@lib/course";
import { getDocumentWithContent } from "@lib/document";
import { Box, Container, Stack, useTheme } from "@mui/material";
import CourseBreadrumbsNav from "@page-components/Course/CourseBreadrumbsNav";
import LearnContentDrawer from "@page-components/Course/LearnContentDrawer";
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
        </Container>
      </Box>
    </Stack>
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

      let document = {};

      if (docFound) {
        document = await getDocumentWithContent(docId);
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
