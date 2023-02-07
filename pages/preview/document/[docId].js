import ContentDocument from "@components/Document/index";
import { NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_MOBILE } from "@constants/";
import { withUser } from "@hoc/routes";
import { getDocumentWithContentAdmin } from "@lib/admin/document";
import { getDraftAdmin } from "@lib/admin/drafts";
import { Container, Typography, useTheme } from "@mui/material";
import ErrorPage from "@page-components/Error";
import { cleanObject } from "@utils/helpers";

const PreviewDocument = ({ document }) => {
  const theme = useTheme();

  if (!document) return <ErrorPage />;

  return (
    <Container
      maxWidth="xl"
      sx={{
        pt: `${NAVBAR_HEIGHT_MOBILE}px`,
        [theme.breakpoints.up("md")]: {
          pt: `${NAVBAR_HEIGHT_DESKTOP}px`,
        },
      }}
    >
      <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
        ----- PREVIEW -----
      </Typography>

      <ContentDocument data={document} previewMode />
    </Container>
  );
};

export default PreviewDocument;

export const getServerSideProps = withUser(
  async (context, { db, user, profile }) => {
    try {
      const docId = context.params.docId;

      const isDraft = context.query?.draft === "true";

      const res = isDraft
        ? await getDraftAdmin(db, docId)
        : await getDocumentWithContentAdmin(db, docId, true);

      // const document = await getDraft(docId);

      const document = isDraft ? res?.response : res?.response?.document;

      if (document?.author !== profile?.id && user?.trustLevel < 4) {
        return {
          redirect: {
            destination: "/app/studio",
          },
        };
      }

      return {
        props: {
          document: JSON.parse(JSON.stringify(cleanObject(document))),
        },
      };
    } catch (error) {
      console.log(1, error);
      return { redirect: { destination: "/app/studio" } };
    }
  }
);
