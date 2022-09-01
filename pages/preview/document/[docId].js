import ContentDocument from "@components/Document/index";
import { NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_MOBILE } from "@constants/";
import { withUser } from "@hoc/routes";
import { getDocumentWithContent } from "@lib/document";
import { getDraft } from "@lib/drafts";
import { Box, Container, Typography, useTheme } from "@mui/material";
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
  async (context, { user, profile }) => {
    try {
      const docId = context.params.docId;

      const isDraft = context.query?.draft === "true";

      const res = isDraft
        ? await getDraft(docId)
        : await getDocumentWithContent(docId, true);

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
