import Title from "@components/Title";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ErrorPage = ({ statusCode, title, description }) => {
  const theme = useTheme();

  return (
    <Container sx={{ my: { xs: 5, md: 10 }, minHeight: "50vh" }}>
      <Stack
        spacing={3}
        alignItems="center"
        justifyContent="center"
        sx={{ textAlign: "center" }}
      >
        <Title
          variant="h1"
          sx={{
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(62deg, rgba(48,110,87,1) 0%, rgba(201,254,132,1) 40%, rgba(114,253,166,1) 100%)"
                : "linear-gradient(62deg, rgba(194,247,225,1) 0%, rgba(97,255,182,1) 26%, rgba(167,236,210,1) 38%, rgba(190,255,182,1) 71%, rgba(203,255,145,1) 100%)",
            WebkitTextFillColor: "transparent",
            WebkitBackgroundClip: "text",
            [theme.breakpoints.up("md")]: {
              fontSize: "10rem",
              lineHeight: 0.8,
            },
          }}
        >
          {statusCode}
        </Title>

        <Title variant={{ xs: "h3", md: "h2" }}>{title}</Title>

        <Typography>{description}</Typography>

        <Link href="/">
          <Button sx={{ textTransform: "inherit" }}>
            Return to Maker Academy
            <ArrowForwardIcon sx={{ fontSize: 18, ml: 1 }} />
          </Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default ErrorPage;
