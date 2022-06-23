import DashboardNavbar from "@components/navbars/DashboardNavbar";
import DashboardSidebar from "@components/sidebars/DashboardSidebar";
import {
  DASHBOARD_SIDE_DRAWER_WIDTH,
  NAVBAR_HEIGHT_DESKTOP,
  NAVBAR_HEIGHT_MOBILE,
} from "@constants/";
import { useAppSelector } from "@hooks/useRedux";
import { Box, useTheme } from "@mui/material";
import React from "react";

const DashboardLayout = ({ children }) => {
  const { global } = useAppSelector((state) => state.global);

  const { drawerMenuOpen } = global;

  const theme = useTheme();

  return (
    <React.Fragment>
      <DashboardNavbar />
      <DashboardSidebar />
      <Box
        sx={{
          minHeight: `calc(100vh - ${NAVBAR_HEIGHT_MOBILE}px)`,
          bgcolor: "grey.100",
          P: theme.spacing(2, 3),
          marginTop: `${NAVBAR_HEIGHT_MOBILE}px`,
          [theme.breakpoints.up("lg")]: {
            marginTop: `${NAVBAR_HEIGHT_DESKTOP}px`,
            p: theme.spacing(2, 7),
            width: drawerMenuOpen
              ? `calc(100% - ${DASHBOARD_SIDE_DRAWER_WIDTH}px)`
              : "100%",
            marginLeft: drawerMenuOpen ? `${DASHBOARD_SIDE_DRAWER_WIDTH}px` : 0,
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
};

export default DashboardLayout;
