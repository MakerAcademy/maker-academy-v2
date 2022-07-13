import { Typography } from "@mui/material";
import React from "react";

const Title = ({ sx = {}, variant = "h6", children, ...other }) => {
  const _variant =
    typeof variant === "object"
      ? {
          xs: variant.xs,
          sm: variant.sm || variant.xs,
          md: variant.md || variant.sm || variant.xs,
          lg: variant.lg || variant.md || variant.sm || variant.xs,
          xl:
            variant.xl || variant.lg || variant.md || variant.sm || variant.xs,
        }
      : variant;

  return (
    <Typography
      variant={typeof variant !== "object" ? variant : "h6"}
      sx={{
        color: "text.title",
        typography: typeof _variant === "object" && _variant,
        ...sx,
      }}
      {...other}
    >
      {children}
    </Typography>
  );
};

export default Title;
