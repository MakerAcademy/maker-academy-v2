import LogoBlack from "@assets/images/logos/logo-black.svg";
import LogoWhite from "@assets/images/logos/logo-white.svg";
import { NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_MOBILE } from "@constants/";
import useScrollPosition from "@hooks/useScrollPosition";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Container,
  Hidden,
  IconButton,
  Stack,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import ActionButtons from "./ActionButtons";
import MenuButtons from "./MenuButtons";

const MENU_ITEMS = [
  { name: "content", link: "/content" },
  { name: "programs", link: "/programs" },
  { name: "contribute", link: "/contribute" },
  // { name: "creator", link: "/content" },
];

const Navbar = ({ transparent }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState();
  // const theme = useTheme();

  const scrollPosition = useScrollPosition();

  const isScrolled = scrollPosition > 150;

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        elevation={0}
        sx={{
          flexGrow: 1,
          backgroundColor: transparent
            ? "transparent"
            : theme.palette.primary.main,
          width: "100%",
          zIndex: 999,
          position: "absolute",
          // [theme.breakpoints.up("md")]: {
          //   position: fixed ? "fixed" : "absolute",
          // },
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
              <img
                src={theme.palette.mode === "light" ? LogoBlack : LogoWhite}
                alt="Maker Academy Logo"
                style={{
                  height: "100%",
                  maxHeight: "35px",
                  objectFit: "contain",
                }}
              />
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
