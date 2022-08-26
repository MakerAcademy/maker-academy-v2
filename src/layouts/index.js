import Footer from "@components/Footer";
import Navbar from "@components/navbars/LandingNavbar";
import { NAVBAR_HEIGHT_DESKTOP } from "@constants/";
import { Box, Divider, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const LandingLayout = ({ children }) => {
  const theme = useTheme();

  const { pathname, query } = useRouter();
  const transparent =
    pathname === "/" || pathname === "/home" || pathname.startsWith("/about");

  const withElevation = query.courseId && query.docId;

  const fixed = query.courseId && query.docId;

  return (
    <React.Fragment>
      <Navbar
        transparent={transparent}
        withElevation={withElevation}
        fixed={fixed}
      />

      <Box sx={{ pt: transparent ? 0 : `${NAVBAR_HEIGHT_DESKTOP}px` }}>
        {children}
      </Box>

      <Divider />

      <Footer />
    </React.Fragment>
  );
};

export default LandingLayout;
