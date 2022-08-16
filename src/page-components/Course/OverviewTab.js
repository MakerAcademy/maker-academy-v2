import { Box, Typography, Grid, Stack } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Title from "@components/Title";

const Overview = ({ course }) => {
  const { description, learningOutcomes = [] } = course;

  return (
    <Box>
      <Title variant={{ xs: "h5", md: "h3" }} sx={{ mb: 4 }}>
        Course Overview
      </Title>

      <Typography
        sx={{
          whiteSpace: "pre-line",
          lineHeight: "30px",
          mb: { xs: 5, md: 8 },
        }}
      >
        {description}
      </Typography>

      <Title variant={{ xs: "h5", md: "h3" }} sx={{ mb: 4 }}>
        What you'll learn
      </Title>

      <Grid container spacing={3}>
        {learningOutcomes?.map?.((item, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Stack direction="row" spacing={2} alignItems="center">
              <CheckCircleIcon sx={{ fontSize: 17, color: "primary.main" }} />
              <Typography>{item}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Overview;
