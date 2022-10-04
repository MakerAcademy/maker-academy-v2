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
    pathname === "/" ||
    pathname === "/home" ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/content");

  const withElevation = query.courseId && query.docId;

  const fixed = query.courseId && query.docId;

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      <Navbar
        transparent={transparent}
        withElevation={withElevation}
        fixed={fixed}
      />

      <Box
        sx={{
          pt: transparent ? 0 : `${NAVBAR_HEIGHT_DESKTOP}px`,
          height: "100%",
        }}
      >
        {children}
      </Box>

      {/* <Divider /> */}

      {/* <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}> */}
      <Footer />
      {/* </Box> */}
    </Box>
  );
};

export default LandingLayout;
