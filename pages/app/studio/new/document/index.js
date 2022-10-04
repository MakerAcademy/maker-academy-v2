import { withProtectedUser } from "@hoc/routes";
import { submitDocument } from "@lib/document";
// import DocumentForm from "@forms/DocumentForm";
import DashboardPaper from "@components/DashboardPaper";
import Title from "@components/Title";
import { submitDraft } from "@lib/drafts";
import { Box, Typography } from "@mui/material";
import { cleanObject } from "@utils/helpers";
import dynamic from "next/dynamic";
import Router from "next/router";
import { useSnackbar } from "notistack";

const DocumentForm = dynamic(() => import("@forms/DocumentForm"), {
  ssr: false,
});

const NewDocument = ({ user, profile }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleDocumentSubmit = async (data, isDraft) => {
    const _key = enqueueSnackbar("Submitting Document...", {
      variant: "default",
    });

    try {
      const res = !isDraft
        ? await submitDocument(profile?.id, cleanObject(data))
        : await submitDraft(profile?.id, cleanObject(data));

      // closeSnackbar(_key);
      enqueueSnackbar("Success", {
        variant: "success",
        autoHideDuration: 2000,
        onClose: () => Router.push("/app/studio"),
      });
    } catch (error) {
      enqueueSnackbar("Error", {
        variant: "error",
        autoHideDuration: 2000,
        onClose: () => Router.push("/app/studio"),
      });
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Title
        variant={{ xs: "h6", md: "h4" }}
        sx={{ mb: 1, fontWeight: "600 !important" }}
      >
        Create New Document
      </Title>

      <Typography sx={{ mb: 3 }}>
        Qui aliqua Lorem nisi quis ut nisi ad excepteur sit eiusmod velit.
      </Typography>

      <DashboardPaper>
        <DocumentForm handleSubmit={handleDocumentSubmit} />
      </DashboardPaper>
    </Box>
  );
};

export default NewDocument;

export const getServerSideProps = withProtectedUser();
