import { Box } from "@mui/material";
import React, { useState } from "react";
import { parseMdCode } from ".";

const MarkdownBox = ({ data }) => {
  console.log("data", data);

  return <Box sx={{ bgcolor: "primary.grey1" }}>MarkdownBox</Box>;
};

export default MarkdownBox;
