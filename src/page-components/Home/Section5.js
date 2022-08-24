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

const testimonials = [
  {
    height: 222,
    testimonial:
      "I love the @MakerAcademy and it's a great source of information for anyone looking to get invloved in the MakerDAO community.",
    avatar: "",
    name: "John",
    username: "web3dev",
  },
  {
    height: 165,
    testimonial: "I love the @MakerAcademy and it's a great source",
    avatar: "",
    name: "John",
    username: "web3dev",
  },
  {
    height: 222,
    testimonial:
      "I love the @MakerAcademy and it's a great source of information for anyone looking to get invloved in the MakerDAO community.",
    avatar: "",
    name: "John",
    username: "web3dev",
  },
  {
    height: 222,
    testimonial:
      "I love the @MakerAcademy and it's a great source of information for anyone looking to get invloved in the MakerDAO community.",
    avatar: "",
    name: "John",
    username: "web3dev",
  },
  {
    height: 280,
    testimonial:
      "I love the @MakerAcademy and it's a great source of information for anyone looking to get invloved in the MakerDAO community. efnjwefniolwefnfwenklfnwek wfenfowenfwenf wfennlfwefnlefw",
    avatar: "",
    name: "John",
    username: "web3dev",
  },
  {
    height: 222,
    testimonial:
      "I love the @MakerAcademy and it's a great source of information for anyone looking to get invloved in the MakerDAO community.",
    avatar: "",
    name: "John",
    username: "web3dev",
  },
  {
    height: 222,
    testimonial:
      "I love the @MakerAcademy and it's a great source of information for anyone looking to get invloved in the MakerDAO community.",
    avatar: "",
    name: "John",
    username: "web3dev",
  },
  {
    height: 222,
    testimonial:
      "I love the @MakerAcademy and it's a great source of information for anyone looking to get invloved in the MakerDAO community.",
    avatar: "",
    name: "John",
    username: "web3dev",
  },
];

const Section5 = () => {
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
              {t("section5_what_you_think")}
            </Title>
          </Fade>

          <Fade delay={100} triggerOnce>
            <Typography sx={{ textAlign: "center", maxWidth: 750 }}>
              {t("section5_description")}
            </Typography>
          </Fade>

          <Masonry
            columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            spacing={3}
            sx={{ pt: 3 }}
          >
            {testimonials.map(
              ({ height, testimonial, name, username }, index) => {
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
                          {_testimonial[0]?.trim()}&nbsp;
                        </Typography>

                        <Typography
                          variant="body2"
                          component="span"
                          color="primary"
                          sx={{
                            cursor: "pointer",
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                        >
                          MakerAcademy
                        </Typography>

                        <Typography variant="body2" component="span">
                          &nbsp;{_testimonial[1]?.trim() || ""}
                        </Typography>
                      </Box>

                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{
                          pr: 2,
                          position: "absolute",
                          bottom: theme.spacing(3),
                          width: "-webkit-fill-available",
                        }}
                      >
                        <Avatar
                          src="https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-1-avatar-2754574_120513.png"
                          sx={{ height: 45, width: 45 }}
                        />

                        <Stack sx={{ flex: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {name}
                          </Typography>
                          <Typography variant="body2" color="primary.grey4">
                            @{username}
                          </Typography>
                        </Stack>

                        <IconButton size="small" color="primary">
                          <TwitterIcon fontSize="small" />
                        </IconButton>
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

export default Section5;
