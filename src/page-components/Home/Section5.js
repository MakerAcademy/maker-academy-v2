import Title from "@components/Title";
import { Masonry } from "@mui/lab";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { Fade, JackInTheBox } from "react-awesome-reveal";
import { BlurSection4 } from "./images";

const heights = [222, 139, 222, 222, 310, 222, 222, 222];

const Section5 = () => {
  return (
    <Box sx={{ my: 10, position: "relative" }}>
      <img
        loading="lazy"
        src={BlurSection4}
        alt="Blur 3"
        style={{
          maxWidth: "100%",
          position: "absolute",
          top: -50,
          right: 0,
          zIndex: -1,
          // filter: "blur(10px)",
        }}
      />

      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={4}>
          <Fade>
            <Title
              variant="h2"
              sx={{ textAlign: "center", color: "text.title" }}
            >
              Let us know what you think.
            </Title>
          </Fade>

          <Fade delay={100}>
            <Typography sx={{ textAlign: "center", maxWidth: 750 }}>
              We're proud to be the main source of information for the MakerDAO
              community and thankful for any feedback, support or suggestions.
            </Typography>
          </Fade>

          <Masonry columns={{ xs: 1, sm: 2, md: 4 }} spacing={3} sx={{ pt: 3 }}>
            {heights.map((height, index) => (
              <JackInTheBox key={index} delay={50 * index}>
                <Paper
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
              </JackInTheBox>
            ))}
          </Masonry>
        </Stack>
      </Container>
    </Box>
  );
};

export default Section5;
