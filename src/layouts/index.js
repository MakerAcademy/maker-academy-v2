// import Footer from "@components/Footer";
// import Navbar from "@components/navbars/LandingNavbar";
import { NAVBAR_HEIGHT_DESKTOP } from "@constants/";
import { Box, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const LandingLayout = ({ children }) => {
  const theme = useTheme();

  const { pathname, query } = useRouter();
  const isHomePage = pathname === "/";
  const removePadding =
    isHomePage || query.docId || query.courseId || query.assessmentId;

  return (
    <React.Fragment>
      {/* <Navbar fixed={isHomePage} transparent={removePadding} /> */}

      <Box sx={{ pt: removePadding ? 0 : `${NAVBAR_HEIGHT_DESKTOP}px` }}>
        {children}
      </Box>

      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default LandingLayout;
