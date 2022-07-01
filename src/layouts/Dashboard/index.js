import DashboardNavbar from "@components/navbars/DashboardNavbar";
import DashboardSidebar from "@components/sidebars/DashboardSidebar";
import {
  DASHBOARD_SIDE_DRAWER_WIDTH,
  NAVBAR_HEIGHT_DESKTOP,
  NAVBAR_HEIGHT_MOBILE,
} from "@constants/";
import { useAppSelector } from "@hooks/useRedux";
import { Box, Container, useTheme } from "@mui/material";
import { BlurSection1, BlurSection2 } from "@page-components/Home/images";
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
          position: "relative",
          minHeight: `calc(100vh - ${NAVBAR_HEIGHT_MOBILE}px)`,
          // P: theme.spacing(2, 3),
          marginTop: `${NAVBAR_HEIGHT_MOBILE}px`,
          [theme.breakpoints.up("lg")]: {
            marginTop: `${NAVBAR_HEIGHT_DESKTOP}px`,
            // p: theme.spacing(2, 7),
            width: drawerMenuOpen
              ? `calc(100% - ${DASHBOARD_SIDE_DRAWER_WIDTH}px)`
              : "100%",
            marginLeft: drawerMenuOpen ? `${DASHBOARD_SIDE_DRAWER_WIDTH}px` : 0,
          },
        }}
      >
        <img
          loading="lazy"
          src={BlurSection1}
          alt="Blur 1"
          style={{
            maxWidth: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0.2,
            // zIndex: -1,
          }}
        />

        <img
          loading="lazy"
          src={BlurSection2}
          alt="Blur 1"
          style={{
            maxWidth: "100%",
            position: "absolute",
            bottom: 0,
            right: 0,
            opacity: 0.2,
            // zIndex: -1,
          }}
        />
        <Container maxWidth="xl" sx={{ p: 4, px: "32px !important" }}>
          {children}
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default DashboardLayout;
