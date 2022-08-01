import Title from "@components/Title";
import { withProtectedUser } from "@hoc/routes";
import { submitCourse } from "@lib/course";
import { Box, Container, Paper, Typography } from "@mui/material";
import { cleanObject } from "@utils/helpers";
import dynamic from "next/dynamic";
import Router from "next/router";
import { useSnackbar } from "notistack";

const CourseForm = dynamic(() => import("@components/forms/CourseForm"), {
  ssr: false,
});

const NewCourse = ({ user, profile }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleCourseSubmit = async (data) => {
    const _key = enqueueSnackbar("Submitting Course...", {
      variant: "default",
    });

    const res = await submitCourse(profile?.id, cleanObject(data))
      .then(() => {
        closeSnackbar(_key);
        enqueueSnackbar("Success", {
          variant: "success",
          autoHideDuration: 2000,
          onClose: () => Router.push("/app/studio"),
        });
      })
      .catch((err) => {
        enqueueSnackbar("Error", {
          variant: "error",
          autoHideDuration: 2000,
          onClose: () => Router.push("/app/studio"),
        });
      });
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

      <CourseForm handleSubmit={handleCourseSubmit} />
    </Box>
  );
};

export default NewCourse;

export const getServerSideProps = withProtectedUser();
