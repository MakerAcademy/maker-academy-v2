import ContentDocument from "@components/Document/index";
import { NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_MOBILE } from "@constants/";
import { withUser } from "@hoc/routes";
import { getDocumentWithContentAdmin } from "@lib/admin/document";
import { Container, useTheme } from "@mui/material";
import ErrorPage from "@page-components/Error";
import { cleanObject } from "@utils/helpers";
import Head from "next/head";

const Document = ({ document: _document }) => {
  const theme = useTheme();

  if (!_document) return <ErrorPage />;

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
      <Head>
        <title>{_document?.title || "Hello"}</title>
        <meta name="description" content={_document?.description} />
      </Head>

      <ContentDocument data={_document} />
    </Container>
  );
};

export default Document;

export const getServerSideProps = withUser(async (context, { db, user }) => {
  try {
    const docId = context.params.docId;

    const document = await getDocumentWithContentAdmin(db, docId);

    if (document?.response?.private && user?.trustLevel < 4) {
      return { redirect: { destination: "/content" } };
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
});
