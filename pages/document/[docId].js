import ContentDocument from "@components/Document/index";
import { NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_MOBILE } from "@constants/";
import { withUser } from "@hoc/routes";
import { getDocumentWithContent } from "@lib/document";
import { Box, Container, useTheme } from "@mui/material";
import ErrorPage from "@page-components/Error";

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
      <ContentDocument data={document} />
    </Container>
  );
};

export default Document;

export const getServerSideProps = withUser(async (context, { user }) => {
  try {
    const docId = context.params.docId;

    const document = await getDocumentWithContent(docId);

    if (document?.private && user?.trustLevel < 4) {
      return { redirect: { destination: "/content" } };
    }

    return {
      props: { document },
    };
  } catch (error) {
    console.log(1, error);
    return { redirect: { destination: "/content" } };
  }
});
