import { Box, Link } from "@mui/material";
import React from "react";

const MdImage = ({ data }) => {
  const {
    src,
    title = "Image",
    width = "100%",
    height = "100%",
    href,
  } = data || {};

  const Component = ({ children }) => {
    if (href)
      return (
        <Link href={href} target="_blank" underline="none">
          {children}
        </Link>
      );

    return <>{children}</>;
  };

  return (
    <Component>
      <Box
        sx={(theme) => ({
          maxWidth: "100%",
          maxHeight: height,
          [theme.breakpoints.up("md")]: {
            maxWidth: `${width}${width.includes("%") ? "" : "px"}`,
          },
        })}
      >
        <img
          src={src}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>
    </Component>
  );
};

export default MdImage;
