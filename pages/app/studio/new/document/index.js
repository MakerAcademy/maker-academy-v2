import { withProtectedUser } from "@hoc/routes";
import { submitDocument } from "@lib/document";
// import DocumentForm from "@forms/DocumentForm";
import Title from "@components/Title";
import { Box, Container, Paper, Typography } from "@mui/material";
import dynamic from "next/dynamic";

const DocumentForm = dynamic(() => import("@forms/DocumentForm"), {
  ssr: false,
});

const DUMMY_DOCUMENT = {
  title: "Title 1",
  description:
    "Magna et eu enim velit sit et reprehenderit commodo exercitation.",
  level: "beginner",
  topic: "MakerDAO",
  brand: "Meta Analysis",
  duration: 30,
  markdown: "### Hello this is a markdown value",
  private: false,
  thumbnail:
    "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.png",
};

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

      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 5,
          borderRadius: 4,
          boxShadow: "0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        }}
      >
        <DocumentForm handleSubmit={handleDocumentSubmit} />
      </Paper>
    </Box>
  );
};

export default NewDocument;

export const getServerSideProps = withProtectedUser();
