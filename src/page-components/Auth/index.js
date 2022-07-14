import LoginForm from "@components/forms/LoginForm";
import RegisterForm from "@components/forms/RegisterForm";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Container,
  Grid,
  Hidden,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import { FullLogoBlack, FullLogoWhite } from "@utils/images";
import Link from "next/link";
import LoginContent from "./LoginContent";
import RegisterContent from "./RegisterContent";
import Texture1 from "@assets/images/backgrounds/texture1.png";
import Blur1 from "@assets/images/misc/authShape.png";
import Router, { useRouter } from "next/router";
import { Fade, Slide, Zoom } from "react-awesome-reveal";

const CloseButton = () => {
  return (
    <IconButton
      onClick={() => Router.push("/")}
      sx={(theme) => ({
        zIndex: 1,
        fontSize: 30,
        color: theme.palette.text.disabled,
        "&:hover": {
          color: theme.palette.primary.main,
        },
      })}
    >
      <CloseIcon />
    </IconButton>
  );
};

const Auth = () => {
  const theme = useTheme();
  const { pathname } = useRouter();
  const isLogin = pathname === "/login";

  return (
    <Grid container sx={{ minHeight: "100vh", position: "relative" }}>
      <img
        loading="lazy"
        src={Blur1}
        alt="Blur 1"
        style={{
          maxWidth: "100%",
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: -1,
          filter:
            theme.palette.mode === "dark" && "invert(80%) brightness(60%)",
        }}
      />

      {/* Left Content */}
      <Grid
        item
        xs={12}
        md={5}
        lg={4}
        sx={{
          bgcolor:
            theme.palette.mode === "dark" ? "common.black" : "common.white",
          backgroundImage: `url(${Texture1})`,
        }}
      >
        <Stack sx={{ height: "100%", p: { xs: 3 } }}>
          {/* Logo */}
          <Fade>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
              // sx={{ p: { xs: 3, md: 6 } }}
            >
              <Link href="/" passHref>
                <img
                  loading="lazy"
                  src={
                    theme.palette.mode === "dark"
                      ? FullLogoWhite
                      : FullLogoBlack
                  }
                  alt={"Maker Academy Logo"}
                  style={{
                    height: 40,
                    objectFit: "contain",
                    cursor: "pointer",
                    zIndex: 999,
                  }}
                />
              </Link>

              <Hidden mdUp>
                <CloseButton />
              </Hidden>
            </Stack>
          </Fade>

          {/* Content */}
          <Box
            sx={{
              flex: 1,
              [theme.breakpoints.up("md")]: { mt: -7 },
            }}
          >
            <Container sx={{ py: 5, height: "100%" }} maxWidth="xs">
              {isLogin ? <LoginContent /> : <RegisterContent />}
            </Container>
          </Box>
        </Stack>
      </Grid>

      {/* Right Content */}
      <Grid item xs={12} md={7} lg={8}>
        <Stack sx={{ height: "100%" }}>
          {/* Close Button */}
          <Fade>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              sx={{ p: { xs: 3 } }}
              spacing={3}
            >
              {isLogin ? (
                <Link href="/register" passHref>
                  <Button sx={{ fontWeight: 600, textTransform: "inherit" }}>
                    Register
                  </Button>
                </Link>
              ) : (
                <Link href="/login" passHref>
                  <Button sx={{ fontWeight: 600, textTransform: "inherit" }}>
                    Login
                  </Button>
                </Link>
              )}

              <Hidden mdDown>
                <CloseButton />
              </Hidden>
            </Stack>
          </Fade>

          {/* Content */}
          <Box sx={{ flex: 1, [theme.breakpoints.up("md")]: { mt: -7 } }}>
            <Container
              sx={{
                py: 5,
                height: "100%",
              }}
              maxWidth="md"
            >
              {isLogin ? <LoginForm /> : <RegisterForm />}
            </Container>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Auth;
