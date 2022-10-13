import Title from "@components/Title";
import { Masonry } from "@mui/lab";
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { Fade, JackInTheBox } from "react-awesome-reveal";
import { BlurSection4 } from "./images";
import TwitterIcon from "@mui/icons-material/Twitter";

import Profile1 from "@assets/images/twitter-profiles/profile1.png";
import Profile2 from "@assets/images/twitter-profiles/profile2.png";
import Profile3 from "@assets/images/twitter-profiles/profile3.png";
import Profile4 from "@assets/images/twitter-profiles/profile4.png";
import Profile5 from "@assets/images/twitter-profiles/profile5.png";
import Profile6 from "@assets/images/twitter-profiles/profile6.png";
import Profile7 from "@assets/images/twitter-profiles/profile7.png";
import Profile8 from "@assets/images/twitter-profiles/profile8.png";

const testimonials = [
  {
    height: 230,
    testimonial:
      "I joined Maker Academy as a web3 contributor because I wanted to learn more about the inner workings of one of the world's most important blockchain projects.",
    avatar: Profile1,
    name: "Maxim",
    username: "web3dev",
  },
  {
    height: 230,
    testimonial:
      "The design on Maker Academy looks amazing. I love how they hav embedded and interactive components in their courses and articles.",
    avatar: Profile2,
    name: "Alice",
    username: "web3dev",
  },
  {
    height: 230,
    testimonial:
      "Joining Maker Academy was the best decision I ever made. The community is friendly and supportive, and I've learned a lot from the other contributors.",
    avatar: Profile3,
    name: "Alexey",
    username: "web3dev",
  },
  {
    height: 230,
    testimonial:
      "Joined Maker Academy as a web3 beginner and soon became one of the most active contributors, thanks to the welcoming and supportive community.",
    avatar: Profile4,
    name: "Dima",
    username: "web3dev",
  },
  {
    height: 230,
    testimonial:
      "Definitely one of the best defi academies that I have seen. Very cool that it integrates the onboarding process right into the platform.",
    avatar: Profile5,
    name: "John",
    username: "web3dev",
  },
  {
    height: 230,
    testimonial:
      "Maker Academy allowed me to quickly learn about MakerDAO and the wider DAO space, making me more confident in participating in future DAOs.",
    avatar: Profile6,
    name: "Franz",
    username: "web3dev",
  },
  {
    height: 180,
    testimonial:
      "I am super pleased to finally have a place to go for all my questions about Maker.",
    avatar: Profile7,
    name: "Michelle",
    username: "web3dev",
  },
  {
    height: 210,
    testimonial:
      "I love the editing features on Maker Academy. When I am writing my defi-related content, it feels like a better version of Google Docs!",
    avatar: Profile8,
    name: "Nick",
    username: "web3dev",
  },
];

const Section4 = () => {
  const theme = useTheme();
  const { t } = useTranslation("home");

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
              {t("section4_what_people_say")}
            </Title>
          </Fade>

          <Fade delay={100} triggerOnce>
            <Typography sx={{ textAlign: "center", maxWidth: 750 }}>
              {t("section4_description")}
            </Typography>
          </Fade>

          <Masonry
            columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            spacing={3}
            sx={{ pt: 3 }}
          >
            {testimonials.map(
              ({ height, testimonial, name, username, avatar }, index) => {
                const _testimonial = testimonial.split("@MakerAcademy");

                return (
                  <JackInTheBox key={index} delay={50 * index} triggerOnce>
                    <Paper
                      elevation={0}
                      sx={{
                        position: "relative",
                        minHeight: height,
                        borderRadius: "24px",
                        // boxShadow: "10px 12px 141px rgba(126, 129, 164, 0.2)",
                        p: 3,
                      }}
                    >
                      <Box sx={{ pb: 5 }}>
                        <Typography variant="body2" component="span">
                          {testimonial}
                        </Typography>
                      </Box>

                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1.5}
                        sx={{
                          pr: 2,
                          position: "absolute",
                          bottom: theme.spacing(3),
                          width: "-webkit-fill-available",
                        }}
                      >
                        <Avatar src={avatar} sx={{ height: 45, width: 45 }} />

                        <Stack sx={{ flex: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {name}
                          </Typography>
                          {/* <Typography variant="body2" color="grey.grey4">
                            @{username}
                          </Typography> */}
                        </Stack>

                        {/* <IconButton size="small" color="primary"> */}
                        <TwitterIcon fontSize="small" />
                        {/* </IconButton> */}
                      </Stack>
                    </Paper>
                  </JackInTheBox>
                );
              }
            )}
          </Masonry>
        </Stack>
      </Container>
    </Box>
  );
};

export default Section4;
