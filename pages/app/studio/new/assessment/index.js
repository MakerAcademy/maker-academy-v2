import Title from "@components/Title";
import { withProtectedUser } from "@hoc/routes";
import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const AssessmentForm = dynamic(
  () => import("@components/forms/AssessmentForm"),
  {
    ssr: false,
  }
);

const Assessment = () => {
  const handleAssessmentSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Box>
      <Title
        variant={{ xs: "h6", md: "h4" }}
        sx={{ mb: 1, fontWeight: "600 !important" }}
      >
        Create New Assessment
      </Title>

      <Typography sx={{ mb: 3 }}>
        Qui aliqua Lorem nisi quis ut nisi ad excepteur sit eiusmod velit.
      </Typography>

      <AssessmentForm handleSubmit={handleAssessmentSubmit} />
    </Box>
  );
};

export default Assessment;

export const getServerSideProps = withProtectedUser();
