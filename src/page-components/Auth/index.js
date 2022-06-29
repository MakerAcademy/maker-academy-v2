import LoginForm from "@components/forms/LoginForm";
import RegisterForm from "@components/forms/RegisterForm";
import { Box, Button, Container, Grid, Stack, useTheme } from "@mui/material";
import { FullLogoBlack, FullLogoWhite } from "@utils/images";
import Link from "next/link";
import { useRouter } from "next/router";
import LoginContent from "./LoginContent";
import RegisterContent from "./RegisterContent";
import Texture1 from "@assets/images/backgrounds/texture1.png";

const Auth = () => {
  const theme = useTheme();
  const { pathname } = useRouter();
  const isLogin = pathname === "/login";

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Left Content */}
      <Grid item xs={12} md={5} lg={4} sx={{ background: `url(${Texture1})` }}>
        <Stack sx={{ height: "100%", p: { xs: 3, md: 6 } }}>
          {/* Logo */}
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
                  theme.palette.mode === "dark" ? FullLogoWhite : FullLogoBlack
                }
                alt={"Maker Academy Logo"}
                style={{
                  height: 40,
                  objectFit: "contain",
                  cursor: "pointer",
                }}
              />
            </Link>

            {/* <Hidden mdUp>
              <CloseButton />
            </Hidden> */}
          </Stack>

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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ p: { xs: 3, md: 6 } }}
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

            {/* <Hidden mdDown>
              <CloseButton />
            </Hidden> */}
          </Stack>

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
