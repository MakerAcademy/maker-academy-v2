import ContentDocument from "@components/Document/index";
import { NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_MOBILE } from "@constants/";
import { withUser } from "@hoc/routes";
import { getDocumentWithContent } from "@lib/document";
import { Box, Container, Typography, useTheme } from "@mui/material";
import ErrorPage from "@page-components/Error";
import { cleanObject } from "@utils/helpers";

const Document = ({ document }) => {
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
      <Typography variant="h6" sx={{ mb: 3 }}>
        PREVIEW
      </Typography>
      <ContentDocument data={document} />
    </Container>
  );
};

export default Document;

export const getServerSideProps = withUser(
  async (context, { user, profile }) => {
    try {
      const docId = context.params.docId;

      const document = await getDocumentWithContent(docId);

      if (
        document?.response?.status === "draft" &&
        (document?.response?.author === profile?.id || user?.trustLevel < 4)
      ) {
        return {
          redirect: {
            destination: profile?.private ? "/content" : `/document/${docId}`,
          },
        };
      }

      return {
        props: {
          document: JSON.parse(
            JSON.stringify(cleanObject(document?.response || {}))
          ),
        },
      };
    } catch (error) {
      console.log(1, error);
      return { redirect: { destination: "/content" } };
    }
  }
);
