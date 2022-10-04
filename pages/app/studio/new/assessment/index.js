import Title from "@components/Title";
import { withProtectedUser } from "@hoc/routes";
import { submitAssessment } from "@lib/assessment";
import { Box, Typography } from "@mui/material";
import { cleanObject } from "@utils/helpers";
import dynamic from "next/dynamic";
import Router from "next/router";
import { useSnackbar } from "notistack";

const AssessmentForm = dynamic(
  () => import("@components/forms/AssessmentForm"),
  {
    ssr: false,
  }
);

const Assessment = ({ profile }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleAssessmentSubmit = async (data) => {
    const _key = enqueueSnackbar("Submitting Assessment...", {
      variant: "default",
    });

    const res = await submitAssessment(profile?.id, cleanObject(data))
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
        Create New Assessment
      </Title>

      <Typography sx={{ mb: 3 }}>
        Qui aliqua Lorem nisi quis ut nisi ad excepteur sit eiusmod velit.
      </Typography>

      <AssessmentForm handleSubmit={handleAssessmentSubmit} />
    </Box>
  );
};

export default Assessment;

export const getServerSideProps = withProtectedUser();
