import LanguageMenu from "@components/buttons/LanguageButton";
import ThemeSwitch from "@components/buttons/ThemeSwitch";
import { NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_MOBILE } from "@constants/";
import useScrollPosition from "@hooks/useScrollPosition";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Container,
  Drawer,
  Hidden,
  IconButton,
  MenuItem,
  Stack,
  useTheme,
} from "@mui/material";
import { FullLogoBlack, FullLogoWhite } from "@utils/images";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useState } from "react";
import ActionButtons from "./ActionButtons";
import MenuButtons from "./MenuButtons";

const MENU_ITEMS = [
  { name: "content", link: "/content" },
  { name: "about", link: "/about/mission" },
  { name: "profiles", link: "/profiles" },
  // { name: "creator", link: "/content" },
];

const MobileDrawer = ({ anchorEl, setAnchorEl }) => {
  const { t } = useTranslation("common");

  return (
    <Drawer
      anchor="right"
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
      PaperProps={{ sx: { minWidth: 300 } }}
    >
      {MENU_ITEMS.map((item, i) => (
        <Box key={i}>
          <Link href={item.link || ""} passHref>
            <MenuItem>{t(item.name)}</MenuItem>
          </Link>

          {item.nestedItems?.map((subItem, j) => (
            <Link href={subItem.link || ""} key={`${i}${j}`} passHref>
              <MenuItem>{t(subItem.name)}</MenuItem>
            </Link>
          ))}
        </Box>
      ))}

      <Box sx={{ pl: 1 }}>
        <LanguageMenu fullWidth />
      </Box>

      <Box sx={{ pl: 2 }}>
        <ThemeSwitch fullWidth />
      </Box>
    </Drawer>
  );
};

const Navbar = ({ transparent, withElevation, fixed }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState();

  // const theme = useTheme();

  const scrollPosition = useScrollPosition();

  const isScrolled = scrollPosition > 150;

  return (
    <AppBar
      elevation={withElevation ? 2 : 0}
      sx={{
        flexGrow: 1,
        backgroundColor: transparent
          ? "transparent"
          : theme.palette.background.default,
        width: "100%",
        zIndex: theme.zIndex.drawer + 1,
        position: "absolute",
        // position: fixed ? "fixed" : "absolute",
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
              src={
                theme.palette.mode === "light" ? FullLogoBlack : FullLogoWhite
              }
              alt="Maker Academy Logo"
              style={{
                height: "100%",
                maxHeight: "35px",
                objectFit: "contain",
                cursor: "pointer",
              }}
            />
          </Link>

          <Hidden mdDown>
            {/* Menu Buttons */}
            <MenuButtons menuItems={MENU_ITEMS} theme={theme} />

            {/* Other Buttons */}
            <ActionButtons />
          </Hidden>

          {/* Mobile Navbar */}
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

            <MobileDrawer anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
          </Hidden>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Navbar;
