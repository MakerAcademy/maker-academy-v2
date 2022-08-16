import { Button, useTheme } from "@mui/material";
import React from "react";

const GreenButton = (
  { children, variant, size, fullWidth, sx = {}, ...other },
  ref
) => {
  const theme = useTheme();

  return (
    <Button
      ref={ref}
      fullWidth={fullWidth}
      variant="contained"
      sx={{
        fontWeight: 600,
        backgroundColor:
          variant == "outlined" ? "transparent" : theme.palette.primary.main,
        border: `2px solid ${theme.palette.primary.main}`,
        color:
          variant == "outlined"
            ? theme.palette.primary.main
            : theme.palette.common.white,
        textTransform: "inherit",
        borderRadius: "8px",
        py: size === "small" ? 0.6 : size === "large" ? 1.5 : 1,
        px: size === "small" ? 3 : size === "large" ? 4 : 3,
        fontSize: size === "small" ? 14 : size === "large" ? 16 : 16,
        boxShadow: variant === "outlined" && "none",
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          border: `2px solid ${theme.palette.primary.main}`,
          boxShadow: variant !== "outlined" && "none",
        },
        ...sx,
      }}
      {...other}
    >
      {children}
    </Button>
  );
};

export default React.forwardRef(GreenButton);
