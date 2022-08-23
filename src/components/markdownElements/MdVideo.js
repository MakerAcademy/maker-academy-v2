import { Box } from "@mui/material";
import ReactPlayer from "react-player";

const MdVideo = ({ data }) => {
  const {
    url = "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    width = "100%",
    height = "100%",
  } = data || {};

  return (
    <Box
      sx={(theme) => ({
        maxWidth: "100%",
        // maxHeight: `${height}${height.includes("%") ? "" : "px"}`,
        [theme.breakpoints.up("md")]: {
          maxWidth: `${width}${width.includes("%") ? "" : "px"}`,
        },
      })}
    >
      <ReactPlayer
        url={url}
        controls
        width={"100%"}
        height={`${height}${height.includes("%") ? "" : "px"}`}
      />
    </Box>
  );
};

export default MdVideo;
