// import AccountMenu from "@components/buttons/AccountMenu";
import LanguageMenu from "@components/buttons/LanguageButton";
import ThemeToggleButton from "@components/buttons/ThemeSwitch";
import {
  DASHBOARD_BREADCRUMBS,
  DASHBOARD_SIDE_DRAWER_WIDTH,
  NAVBAR_HEIGHT_DESKTOP,
  NAVBAR_HEIGHT_MOBILE,
} from "@constants";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { setGlobalState } from "@redux/slices/globalSlice";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React from "react";

const DashboardNavbar = () => {
  const { global } = useAppSelector((state) => state.global);
  const { drawerMenuOpen } = global;
  const dispatch = useAppDispatch();

  const { pathname } = useRouter();

  const { t } = useTranslation("common");

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
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={handleDrawerToggle}>
            {drawerMenuOpen ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>

          <Typography>
            {t(DASHBOARD_BREADCRUMBS[pathname] || "dashboard")}
          </Typography>
        </Stack>

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
