import ContentDocument from "@components/Document";
import { NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_MOBILE } from "@constants/";
import { withProtectedUser } from "@hoc/routes";
import useDocRead from "@hooks/useDocRead";
import { getCourseWithContent } from "@lib/course";
import { getDocumentWithContent } from "@lib/document";
import { Box, Container, useTheme } from "@mui/material";
import LearnContentDrawer from "@page-components/Course/LearnContentDrawer";
import { useEffect } from "react";

const LearnContent = ({ course, document: _document }) => {
  const theme = useTheme();

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
      <Container maxWidth="xl">
        <ContentDocument data={_document} />
      </Container>

      <Box
        sx={{
          py: 5,
          position: "absolute",
          right: 0,
          top: `${NAVBAR_HEIGHT_DESKTOP}px`,
        }}
      >
        <LearnContentDrawer course={course} />
      </Box>
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

      const docFound = Object.values(course?.carriculum).find((i) => {
        // console.log(Object.values(i.documents));
        return Object.values(i.documents)?.find((j) => j.docId === docId);
      });

      let document = {};
      if (docFound) {
        document = await getDocumentWithContent(docId);
      } else {
        return { redirect: { destination: `/course/${courseId}` } };
      }

      return {
        props: { course, document },
      };
    } catch (error) {
      console.log(1, error);
      return { redirect: { destination: "/content" } };
    }
  }
);
