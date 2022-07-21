import DashboardPaper from "@components/DashboardPaper";
import Title from "@components/Title";
import { withProtectedUser } from "@hoc/routes";
import { getFullDocument } from "@lib/document";
import { newDocumentEditRequest } from "@lib/editrequests";
import { Box, Typography } from "@mui/material";
import ErrorPage from "@page-components/Error";
import { cleanObject } from "@utils/helpers";
import dynamic from "next/dynamic";
import Router from "next/router";
import { useSnackbar } from "notistack";

const DocumentForm = dynamic(() => import("@forms/DocumentForm"), {
  ssr: false,
});

const editableFields = [
  "title",
  "description",
  "shortDescription",
  // "markdown",
];

const EditDocumentPage = ({ document, profile, user }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  if (!document) return <ErrorPage />;

  const handleDocumentSubmit = async (data) => {
    const _key = enqueueSnackbar("Submitting Document...", {
      variant: "default",
    });

    const res = await newDocumentEditRequest(profile?.id, cleanObject(data))
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

  const isRestricted = document.author !== profile.id || user.trustLevel < 4;

  return (
    <Box sx={{ position: "relative" }}>
      <Title
        variant={{ xs: "h6", md: "h4" }}
        sx={{ mb: 1, fontWeight: "600 !important" }}
      >
        Edit Document
      </Title>

      <Typography sx={{ mb: 3 }}>
        Qui aliqua Lorem nisi quis ut nisi ad excepteur sit eiusmod velit.
      </Typography>

      <DashboardPaper>
        <DocumentForm
          handleSubmit={handleDocumentSubmit}
          values={document}
          edit
          editableFields={isRestricted ? editableFields : null}
        />
      </DashboardPaper>
    </Box>
  );
};

export default EditDocumentPage;

// export async function getServerSideProps(context) {
//   const docId = context.params.id;

//   const res = await getFullDocument(docId, true);

//   return {
//     props: { document: res?.document },
//   };
// }

export const getServerSideProps = withProtectedUser(async (context) => {
  const docId = context.params.id;

  const res = await getFullDocument(docId, true);

  return {
    props: { document: res?.document },
  };
});
