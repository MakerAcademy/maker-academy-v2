import { NAVBAR_HEIGHT_DESKTOP } from "@constants/";
import { Box } from "@mui/material";
import React from "react";

const Learn = () => {
  return (
    <Box sx={{ minHeight: "100vh", mt: `${NAVBAR_HEIGHT_DESKTOP + 20}px` }}>
      Learn
    </Box>
  );
};

export default Learn;
