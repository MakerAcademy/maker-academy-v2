import { Masonry } from "@mui/lab";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const heights = [222, 139, 222, 222, 310, 222, 222, 222];

const Section5 = () => {
  return (
    <Box sx={{ my: 15 }}>
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={4}>
          <Typography
            variant="h2"
            sx={{ textAlign: "center", color: "text.title" }}
          >
            Let us know what you think.
          </Typography>

          <Typography sx={{ textAlign: "center", maxWidth: 750 }}>
            We're proud to be the main source of information for the MakerDAO
            community and thankful for any feedback, support or suggestions.
          </Typography>

          <Masonry columns={4} spacing={3} sx={{ pt: 3 }}>
            {heights.map((height, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  height,
                  borderRadius: "24px",
                  boxShadow: "10px 12px 141px rgba(126, 129, 164, 0.2)",
                  p: 3,
                }}
              >
                {index + 1}
              </Paper>
            ))}
          </Masonry>
        </Stack>
      </Container>
    </Box>
  );
};

export default Section5;
