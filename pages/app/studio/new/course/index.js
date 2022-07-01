import Title from "@components/Title";
import { withProtectedUser } from "@hoc/routes";
import { submitCourse } from "@lib/course";
import { Box, Container, Paper, Typography } from "@mui/material";
import dynamic from "next/dynamic";

const CourseForm = dynamic(() => import("@components/forms/CourseForm"), {
  ssr: false,
});

const DUMMY_COURSE = {
  title: "Course 1",
  description:
    "Magna et eu enim velit sit et reprehenderit commodo exercitation.",
  level: "beginner",
  topic: "MakerDAO",
  brand: "Meta Analysis",
  duration: 30,
  markdown: "### Hello this is a markdown value",
  documents: ["XQg5Kc8gZxd3IQ3yResU"],
  thumbnail:
    "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.png",
};

const NewCourse = ({ user, profile }) => {
  const handleCourseSubmit = async (data) => {
    const res = await submitCourse(profile.id, data);

    console.log(res);
  };

  return (
    <Box>
      <Title
        variant={{ xs: "h6", md: "h4" }}
        sx={{ mb: 1, fontWeight: "600 !important" }}
      >
        Create New Course
      </Title>

      <Typography sx={{ mb: 3 }}>
        Qui aliqua Lorem nisi quis ut nisi ad excepteur sit eiusmod velit.
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 5,
          borderRadius: 4,
          boxShadow: "0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        }}
      >
        <CourseForm handleSubmit={handleCourseSubmit} />
      </Paper>
    </Box>
  );
};

export default NewCourse;

export const getServerSideProps = withProtectedUser();
