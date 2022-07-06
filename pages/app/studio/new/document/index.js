import { withProtectedUser } from "@hoc/routes";
import { submitDocument } from "@lib/document";
// import DocumentForm from "@forms/DocumentForm";
import Title from "@components/Title";
import { Box, Container, Paper, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import DashboardPaper from "@components/DashboardPaper";

const DocumentForm = dynamic(() => import("@forms/DocumentForm"), {
  ssr: false,
});

const NewDocument = ({ user, profile }) => {
  const handleDocumentSubmit = async (data) => {
    const res = await submitDocument(profile.id, data);
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
