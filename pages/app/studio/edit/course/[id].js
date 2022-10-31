import Title from "@components/Title";
import { withProtectedUser } from "@hoc/routes";
import { getCourseWithContentAdmin } from "@lib/admin/course";
import { getCourseWithContent, updateCourse } from "@lib/course";
import { submitCourseEditRequest } from "@lib/editrequests";
import { ConstructionOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import ErrorPage from "@page-components/Error";
import { cleanObject } from "@utils/helpers";
import dynamic from "next/dynamic";
import Router from "next/router";
import { useSnackbar } from "notistack";

const CourseForm = dynamic(() => import("@forms/CourseForm"), {
  ssr: false,
});

const editableFields = [
  "title",
  "description",
  "shortDescription",
  // "markdown",
];

const EditCoursePage = ({ course, response, profile, user }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { id: docId, status, published } = response;

  if (!course) return <ErrorPage />;

  const handleCourseSubmit = async (data) => {
    const _key = enqueueSnackbar("Submitting Course...", {
      variant: "default",
    });

    try {
      let res = null;

      if (status === "pending" || user?.trustLevel >= 4) {
        res = await updateCourse({ ...data, published, id: docId });
      } else {
        res = await submitCourseEditRequest(
          profile?.id,
          cleanObject({ ...data, contentId: course.id }),
          course?.id
        );
      }

      closeSnackbar(_key);
      enqueueSnackbar("Success", {
        variant: "success",
        autoHideDuration: 2000,
        onClose: () => Router.push("/app/studio"),
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error", {
        variant: "error",
        autoHideDuration: 2000,
        onClose: () => Router.push("/app/studio"),
      });
    }
  };

  const isRestricted = course.author !== profile?.id || user?.trustLevel < 4;

  return (
    <Box sx={{ position: "relative" }}>
      <Title
        variant={{ xs: "h6", md: "h4" }}
        sx={{ mb: 1, fontWeight: "600 !important" }}
      >
        Edit Course
      </Title>

      <Typography sx={{ mb: 3 }}>
        Qui aliqua Lorem nisi quis ut nisi ad excepteur sit eiusmod velit.
      </Typography>

      <CourseForm
        handleSubmit={handleCourseSubmit}
        values={course}
        edit
        editableFields={isRestricted ? editableFields : null}
      />
    </Box>
  );
};

export const getServerSideProps = withProtectedUser(
  async (context, { db, user, profile }) => {
    const docId = context.params.id;

    const res = await getCourseWithContentAdmin(db, docId, true);

    if (res.author !== profile?.id && user?.trustLevel < 4) {
      return { redirect: { destination: "/app/studio" } };
    }

    return {
      props: {
        response: JSON.parse(JSON.stringify(cleanObject(res))),
        course: JSON.parse(JSON.stringify(cleanObject(res?.document))),
      },
    };
  },
  { trustLevel: 4 }
);

export default EditCoursePage;
