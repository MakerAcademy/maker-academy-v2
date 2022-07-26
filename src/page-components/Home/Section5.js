import Title from "@components/Title";
import { Masonry } from "@mui/lab";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { Fade, JackInTheBox } from "react-awesome-reveal";
import { BlurSection4 } from "./images";

const heights = [222, 139, 222, 222, 310, 222, 222, 222];

const Section5 = () => {
  const { t } = useTranslation("home");

  return (
    <Box sx={{ my: 10, position: "relative" }}>
      {/* <img
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
      /> */}

      <Container
        maxWidth="lg"
        sx={(theme) => ({
          [theme.breakpoints.up("md")]: {
            px: 10,
          },
          [theme.breakpoints.up("lg")]: {
            px: 3,
          },
        })}
      >
        <Stack alignItems="center" spacing={4}>
          <Fade triggerOnce>
            <Title
              variant="h2"
              sx={{ textAlign: "center", color: "text.title" }}
            >
              {t("section5_what_you_think")}
            </Title>
          </Fade>

          <Fade delay={100} triggerOnce>
            <Typography sx={{ textAlign: "center", maxWidth: 750 }}>
              {t("section5_description")}
            </Typography>
          </Fade>

          <Masonry columns={{ xs: 1, sm: 2, md: 4 }} spacing={3} sx={{ pt: 3 }}>
            {heights.map((height, index) => (
              <JackInTheBox key={index} delay={50 * index} triggerOnce>
                <Paper
                  elevation={0}
                  sx={{
                    height,
                    borderRadius: "24px",
                    // boxShadow: "10px 12px 141px rgba(126, 129, 164, 0.2)",
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
