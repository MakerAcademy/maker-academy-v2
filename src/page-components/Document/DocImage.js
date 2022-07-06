import { Box, useTheme } from "@mui/material";
import React from "react";
import Image from "next/image";
import useScrollPosition from "@hooks/useScrollPosition";

const DocImage = ({ thumbnail, title }) => {
  const theme = useTheme();

  const scrollPosition = useScrollPosition();

  return (
    <Box
      sx={{
        transition: "all 1.1s ease",
        marginTop:
          scrollPosition > 100
            ? `-${scrollPosition > 400 ? 400 : scrollPosition}px`
            : "-120px",
        position: "relative",
        height: 250,
        width: "100%",
        [theme.breakpoints.up("md")]: {
          height: 300,
          width: "80%",
          "& img": {
            borderRadius: 5,
          },
        },
        [theme.breakpoints.up("lg")]: {
          height: 350,
          width: "80%",
          "& img": {
            borderRadius: 5,
          },
        },
      }}
    >
      <Image
        src={thumbnail}
        alt={title}
        loader={() => thumbnail}
        layout="fill"
        objectFit="cover"
      />
    </Box>
  );
};

export default DocImage;
