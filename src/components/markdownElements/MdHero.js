import MarkdownBody from "@components/Document/MarkdownBody";
import { Box, Stack, useTheme } from "@mui/material";

const MdHero = ({ data }) => {
  const theme = useTheme();
  const { image, darkImage, lightImage, body, height = 200, color } = data;

  const _image =
    theme.palette.mode === "dark" ? darkImage || image : lightImage || image;

  const _textColor =
    color === "white"
      ? "white"
      : color === "invert"
      ? "text.invert"
      : "text.primary";

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        p: 2,
        position: "relative",
        borderRadius: "24px",
        width: "100%",
        background: `url(${_image})`,
        backgroundColor: "grey.grey3",
        minHeight: `${height}px`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Box sx={{ px: 2, color: _textColor }}>
        <MarkdownBody markdown={body} headingStyle={{ color: _textColor }} />
      </Box>
    </Stack>
  );
};

export default MdHero;
