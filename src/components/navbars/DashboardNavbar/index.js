// import AccountMenu from "@components/buttons/AccountMenu";
import LanguageMenu from "@components/buttons/LanguageButton";
import ThemeToggleButton from "@components/buttons/ThemeSwitch";
import {
  DASHBOARD_SIDE_DRAWER_WIDTH,
  NAVBAR_HEIGHT_DESKTOP,
  NAVBAR_HEIGHT_MOBILE,
} from "@constants";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  useTheme,
} from "@mui/material";
import { setGlobalState } from "@redux/slices/globalSlice";
import React from "react";

const DashboardNavbar = () => {
  const { global } = useAppSelector((state) => state.global);
  const { drawerMenuOpen } = global;
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const handleDrawerToggle = () => {
    dispatch(setGlobalState({ drawerMenuOpen: !drawerMenuOpen }));
  };

  return (
    <AppBar
      sx={{
        borderBottom: "1px",
        [theme.breakpoints.up("lg")]: {
          width: drawerMenuOpen
            ? `calc(100% - ${DASHBOARD_SIDE_DRAWER_WIDTH}px)`
            : "100%",
        },
      }}
      color="inherit"
      elevation={0}
    >
      <Toolbar
        sx={{
          height: NAVBAR_HEIGHT_MOBILE,
          p: theme.spacing(0, 3),
          [theme.breakpoints.up("lg")]: {
            height: NAVBAR_HEIGHT_DESKTOP,
            p: theme.spacing(0, 7),
          },
        }}
      >
        <IconButton onClick={handleDrawerToggle} sx={{ mr: 1 }}>
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <ThemeToggleButton />
          <LanguageMenu />
          {/* <AccountMenu /> */}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
