import { Paper } from "@mui/material";
import React from "react";

const DashboardPaper = ({ sx = {}, children, ...props }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        mb: 5,
        borderRadius: 4,
        boxShadow: "0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};

export default DashboardPaper;
