import LogoDark from "@assets/images/logos/logo-dark.png";
import LogoLight from "@assets/images/logos/logo-light.png";
import { darkTheme } from "@config/theme/dark";
import { lightTheme } from "@config/theme/light";
import { NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_MOBILE } from "@constants/";
import useScrollPosition from "@hooks/useScrollPosition";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Container,
  createTheme,
  Hidden,
  IconButton,
  Stack,
  ThemeProvider,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import ActionButtons from "./ActionButtons";
import MenuButtons from "./MenuButtons";

const MENU_ITEMS = [
  { name: "content", link: "/content" },
  { name: "programs", link: "/programs" },
  { name: "contribute", link: "/contribute" },
  // { name: "creator", link: "/content" },
];

const Navbar = ({ fixed, transparent }) => {
  const [anchorEl, setAnchorEl] = useState();
  // const theme = useTheme();

  const scrollPosition = useScrollPosition();

  const isScrolled = scrollPosition > 150;

  const theme = useMemo(
    () => (isScrolled ? createTheme(lightTheme) : createTheme(darkTheme)),
    [isScrolled]
  );

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        elevation={isScrolled ? 3 : 0}
        sx={{
          flexGrow: 1,
          backgroundColor: isScrolled
            ? "#ffffff"
            : transparent
            ? "transparent"
            : "#14005C",
          width: "100%",
          zIndex: 999,
          [theme.breakpoints.up("md")]: {
            position: fixed ? "fixed" : "absolute",
          },
        }}
      >
        <Container maxWidth="xl">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              transition: "0.4s",
              height: NAVBAR_HEIGHT_MOBILE,
              [theme.breakpoints.up("md")]: {
                height: NAVBAR_HEIGHT_DESKTOP,
              },
            }}
          >
            {/* Logo */}
            <Link href="/" passHref>
              <Box
                sx={{
                  width: 70,
                  p: 1,
                  position: "relative",
                  height: "100%",
                }}
              >
                <Image
                  src={isScrolled ? LogoLight : LogoDark}
                  alt="Maker Academy Logo"
                  priority
                  layout="fill"
                  objectFit="contain"
                  style={{ cursor: "pointer" }}
                />
              </Box>
            </Link>

            <Hidden mdDown>
              {/* Menu Buttons */}
              <MenuButtons menuItems={MENU_ITEMS} theme={theme} />

              {/* Other Buttons */}
              <ActionButtons theme={theme} />
            </Hidden>

            <Hidden mdUp>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Stack>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
