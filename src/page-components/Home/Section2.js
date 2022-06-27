import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

const ActionButton = ({ text, Icon, reverse }) => (
  <Button>
    <Stack
      spacing={1}
      direction="row"
      alignItems="center"
      justifyContent="center"
      flexWrap={reverse ? "wrap-reverse" : "wrap"}
    >
      {reverse && <Icon />}

      <Typography variant="body2" sx={{ height: 20 }}>
        {text}
      </Typography>

      {!reverse && <Icon />}
    </Stack>
  </Button>
);

const ServiceCard = ({ title, description, image, Btn }) => (
  <Card
    elevation={0}
    sx={{
      height: "100%",
      minHeight: 320,
      p: { xs: 3, md: 5 },
      borderRadius: 3,
      boxShadow: "10px 12px 141px rgba(126, 129, 164, 0.2)",
      background:
        "linear-gradient(335deg, rgba(245,252,239,1) 13%, rgba(250,255,247,1) 38%, rgba(255,255,255,1) 100%)",
    }}
  >
    <Grid
      container
      justifyContent="space-between"
      sx={{ height: "100%", gap: "20px" }}
      flexWrap={{ xs: "wrap-reverse", sm: "wrap" }}
    >
      {/* Left */}
      <Grid item xs={12} sm={8}>
        <Stack
          spacing={2}
          justifyContent="space-between"
          sx={{ height: "100%" }}
        >
          <Stack spacing={2}>
            <Typography variant="h3" sx={{ fontSize: "32px" }}>
              {title}
            </Typography>

            <Typography sx={{ whiteSpace: "pre-line" }}>
              {description}
            </Typography>
          </Stack>

          <Box>
            {Btn}
            {/* <Btn /> */}
          </Box>
        </Stack>
      </Grid>

      {/* Right */}
      <Grid item xs={12} sm={"auto"}>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Box sx={{ backgroundColor: "red", height: 125, width: 125 }}></Box>
        </Stack>
      </Grid>
    </Grid>
  </Card>
);

const Section2 = () => {
  return (
    <Box sx={{ mt: 5, mb: 15 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Item 1 */}
          <Grid item xs={12} md={6}>
            <ServiceCard
              title={"What is Maker Academy?"}
              description={"Learn about Maker Academy"}
              Btn={
                <ActionButton
                  text="PLAY VIDEO"
                  Icon={PlayArrowOutlinedIcon}
                  reverse
                />
              }
            />
          </Grid>

          {/* Item 2 */}
          <Grid item xs={12} md={6}>
            <ServiceCard
              title={"Advance Knowledge"}
              description={
                "Tailored programs for subfields of maker that take you from the basics all the way to the advanced"
              }
              Btn={
                <ActionButton
                  text="LEARN MORE"
                  Icon={ArrowForwardOutlinedIcon}
                />
              }
            />
          </Grid>

          {/* Item 3 */}
          <Grid item xs={12} md={6}>
            <ServiceCard
              title={"Contribute"}
              description={
                "Want to add your own content?\nContribute to the Academy using the creator studio"
              }
              Btn={
                <ActionButton
                  text="START CREATING"
                  Icon={ArrowForwardOutlinedIcon}
                />
              }
            />
          </Grid>

          {/* Item 4 */}
          <Grid item xs={12} md={6}>
            <ServiceCard
              title={"Find your role at Maker"}
              description={
                "Want to contribute to MakerDAO?\nSee how you can get involved"
              }
              Btn={
                <ActionButton
                  text="VIEW ROLES"
                  Icon={ArrowForwardOutlinedIcon}
                />
              }
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Section2;
