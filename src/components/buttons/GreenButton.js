import { Button, useTheme } from "@mui/material";
import React from "react";

const GreenButton = ({ children, variant, size, fullWidth, sx = {} }) => {
  const theme = useTheme();

  return (
    <Button
      fullWidth={fullWidth}
      variant="contained"
      sx={{
        backgroundColor:
          variant == "outlined" ? "transparent" : theme.palette.primary.main,
        border: `2px solid ${theme.palette.primary.main}`,
        color:
          variant == "outlined"
            ? theme.palette.primary.main
            : theme.palette.common.white,
        textTransform: "inherit",
        borderRadius: "8px",
        py: size === "small" ? 0.8 : size === "large" ? 1.5 : 1,
        px: size === "small" ? 3 : size === "large" ? 4 : 3,
        fontSize: size === "small" ? 14 : size === "large" ? 16 : 16,
        "&:hover": {
          backgroundColor:
            variant == "outlined" ? theme.palette.primary.main : "transparent",
          color:
            variant == "outlined"
              ? theme.palette.common.white
              : theme.palette.primary.main,
          border: `2px solid ${theme.palette.primary.main}`,
        },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export default GreenButton;
