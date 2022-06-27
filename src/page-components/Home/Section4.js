import { Box, Container, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

const SocialButton = ({ icon, text }) => (
  <Stack spacing={1} justifyContent="center" alignItems="center">
    <Box>Icon</Box>
    <Typography>{text}</Typography>
  </Stack>
);

const Section4 = () => {
  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Box sx={{ backgroundColor: grey[200], p: { xs: 4, md: 6 } }}>
        <Stack
          spacing={4}
          justifyContent="center"
          alignItems="center"
          sx={{ textAlign: "center" }}
        >
          <Typography variant="h2" sx={{ color: "text.title" }}>
            Learn. Contribute. Innovate.
          </Typography>

          <Typography sx={{ maxWidth: 920 }}>
            Your one-stop guide to all things MakerDAO. Learn more about Maker,
            chat with the team, others in the community, and have your say in
            shaping the future if decentralized finance.
          </Typography>

          <Stack direction="row" justifyContent="center" spacing={4}>
            <SocialButton text="Discord" />
            <SocialButton text="Forum" />
            <SocialButton text="Twitter" />
            <SocialButton text="Join" />
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default Section4;
