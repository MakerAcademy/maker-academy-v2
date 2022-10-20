import DashboardPaper from "@components/DashboardPaper";
import Title from "@components/Title";
import { withProtectedUser } from "@hoc/routes";
import { getDocumentWithContentAdmin } from "@lib/admin/document";
import { getDraftAdmin } from "@lib/admin/drafts";
import { updateDocument } from "@lib/document";
import { updateDraft } from "@lib/drafts";
import { submitDocumentEditRequest } from "@lib/editrequests";
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

const EditDocumentPage = ({
  response = {},
  isDraft,
  document,
  profile,
  user,
}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { id: docId, status, published } = response;

  if (!document) return <ErrorPage />;

  const handleDocumentSubmit = async (data, skipEditRequest) => {
    const _key = enqueueSnackbar("Submitting Document...", {
      variant: "default",
    });

    try {
      let res = null;

      if (isDraft) {
        res = await updateDraft(docId, cleanObject(data));
      } else {
        if (status === "pending" || user?.trustLevel >= 4) {
          res = await updateDocument({ ...data, published, id: docId });
        } else {
          res = await submitDocumentEditRequest(
            profile?.id,
            cleanObject({ ...data, contentId: docId }),
            docId,
            published
          );
        }
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

  const isRestricted = document.author !== profile?.id || user?.trustLevel < 4;

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
        {document?.id ? (
          <DocumentForm
            handleSubmit={handleDocumentSubmit}
            values={document}
            edit
            editableFields={isRestricted ? editableFields : null}
            isDraft={isDraft}
          />
        ) : (
          <Typography>Document Not Found</Typography>
        )}
      </DashboardPaper>
    </Box>
  );
};

export const getServerSideProps = withProtectedUser(
  async (context, { db, user, profile }) => {
    const docId = context.params.id;

    const isDraft = context.query?.draft === "true";

    const res = isDraft
      ? await getDraftAdmin(db, docId, true)
      : await getDocumentWithContentAdmin(db, docId, true);

    return {
      props: {
        isDraft,
        response: JSON.parse(JSON.stringify(cleanObject(res?.response))),
        document: JSON.parse(
          JSON.stringify(
            cleanObject(isDraft ? res?.response : res?.response?.document)
          )
        ),
      },
    };
  }
);

export default EditDocumentPage;
