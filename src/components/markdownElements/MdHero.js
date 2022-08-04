import {
  HeadingRenderer,
  ParagraphRenderer,
} from "@components/Document/MarkdownBody";
import { Box, Stack, useTheme } from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

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
        backgroundColor: "primary.grey3",
        minHeight: `${height}px`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Box sx={{ px: 2, color: _textColor }}>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: (_props) =>
              HeadingRenderer({
                ..._props,
                sx: { mt: 0, mb: 1, color: _textColor },
              }),
            h2: (_props) =>
              HeadingRenderer({
                ..._props,
                sx: { mt: 0, mb: 1, color: _textColor },
              }),
            h3: (_props) =>
              HeadingRenderer({
                ..._props,
                sx: { mt: 0, mb: 1, color: _textColor },
              }),
            h4: (_props) =>
              HeadingRenderer({
                ..._props,
                sx: { mt: 0, mb: 1, color: _textColor },
              }),
            h5: (_props) =>
              HeadingRenderer({
                ..._props,
                sx: { mt: 0, mb: 1, color: _textColor },
              }),
            h6: (_props) =>
              HeadingRenderer({
                ..._props,
                sx: { mt: 0, mb: 1, color: _textColor },
              }),
            p: ParagraphRenderer,
          }}
        >
          {body}
        </ReactMarkdown>
      </Box>
    </Stack>
  );
};

export default MdHero;
