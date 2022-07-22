import ContentDocument from "@components/Document/index";
import { NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_MOBILE } from "@constants/";
import { getDocumentWithContent } from "@lib/document";
import { Box, useTheme } from "@mui/material";
import ErrorPage from "@page-components/Error";

const Document = ({ document }) => {
  const theme = useTheme();

  if (!document) return <ErrorPage />;

  const { title, thumbnail } = document;

  return (
    <Box
      sx={{
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(90deg, rgba(0,0,0,0) 40%, #141518 60%)"
            : "linear-gradient(90deg, rgba(0,0,0,0) 40%, #F4F6F7 60%)",
        pt: `${NAVBAR_HEIGHT_MOBILE}px`,
        [theme.breakpoints.up("md")]: {
          pt: `${NAVBAR_HEIGHT_DESKTOP}px`,
        },
      }}
    >
      <ContentDocument data={document} />
    </Box>
  );
};

export default Document;

export async function getServerSideProps(context) {
  const docId = context.params.docId;

  const document = await getDocumentWithContent(docId);

  return {
    props: { document },
  };
}
