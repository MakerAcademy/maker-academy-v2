import Footer from "@components/Footer";
import Navbar from "@components/navbars/LandingNavbar";
import { NAVBAR_HEIGHT_DESKTOP } from "@constants/";
import { Box, Divider, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const LandingLayout = ({ children }) => {
  const theme = useTheme();

  const { pathname, query } = useRouter();
  const transparent = pathname === "/" || pathname === "/home";

  const withElevation = query.courseId;

  return (
    <React.Fragment>
      <Navbar transparent={transparent} withElevation={withElevation} />

      <Box sx={{ pt: transparent ? 0 : `${NAVBAR_HEIGHT_DESKTOP}px` }}>
        {children}
      </Box>

      <Divider />

      <Footer />
    </React.Fragment>
  );
};

export default LandingLayout;
