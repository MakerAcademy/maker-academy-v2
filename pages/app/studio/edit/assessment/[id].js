import Title from "@components/Title";
import { withProtectedUser } from "@hoc/routes";
import { getAssessmentWithContentAdmin } from "@lib/admin/assessment";
import { updateAssessment } from "@lib/assessment";
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

const Assessment = ({ assessment, user, profile }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleAssessmentSubmit = async (data) => {
    const _key = enqueueSnackbar("Updating Assessment...", {
      variant: "default",
    });

    const res = await updateAssessment(cleanObject(data))
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

  const isRestricted =
    assessment.author !== profile?.id || user?.trustLevel < 4;

  return (
    <Box>
      <Title
        variant={{ xs: "h6", md: "h4" }}
        sx={{ mb: 1, fontWeight: "600 !important" }}
      >
        Edit Assessment
      </Title>

      <Typography sx={{ mb: 3 }}>
        Qui aliqua Lorem nisi quis ut nisi ad excepteur sit eiusmod velit.
      </Typography>

      <AssessmentForm
        handleSubmit={handleAssessmentSubmit}
        values={assessment}
        edit
      />
    </Box>
  );
};

export default Assessment;

export const getServerSideProps = withProtectedUser(
  async (context, { db, user, profile }) => {
    const docId = context.params.id;

    const res = await getAssessmentWithContentAdmin(db, docId, true);

    if (res.author !== profile?.id && user?.trustLevel < 4) {
      return { redirect: { destination: "/app/studio" } };
    }

    return {
      props: {
        response: JSON.parse(JSON.stringify(cleanObject(res))),
        assessment: JSON.parse(JSON.stringify(cleanObject(res?.document))),
      },
    };
  },
  { trustLevel: 4 }
);
