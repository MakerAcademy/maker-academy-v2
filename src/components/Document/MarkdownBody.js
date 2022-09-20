import MarkdownComponent from "@components/markdownElements";
import Title from "@components/Title";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { flattenChildren } from "@utils/helperFunctions";
import { createSlug } from "@utils/markdown";
import React from "react";
import { Fade } from "react-awesome-reveal";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import RemarkMathPlugin from "remark-math";

// function HeadingRenderer(props) {
//   var children = React.Children.toArray(props.children);
//   var text = children.reduce(flattenChildren, "");
//   var slug = createSlug(text);
//   return React.createElement("h" + props.level, { id: slug }, props.children);
// }

const HeadingRenderer = (props) => {
  const level = props.level;

  const _variant = props.level + 1;
  const _fontSize = _variant === 2 ? "2.6rem" : null;

  var children = React.Children.toArray(props.children);
  if (children?.[0]?.props?.children) {
    children = React.Children.toArray(children?.[0]?.props?.children);
  }
  var text = children.reduce(flattenChildren, "");
  var slug = createSlug(text);

  const isBigText = [1, 2].includes(level);
  const align = props.align || "left";

  return (
    <Fade triggerOnce>
      <Title
        variant={`h${_variant}`}
        sx={{
          my: isBigText ? 2 : 1.2,
          py: isBigText && 0.5,
          fontSize: _fontSize,
          // pt: 3,
          textAlign: align,
          color: "text.title",
          ...(props.sx || {}),
        }}
        id={slug}
      >
        {props.children}
      </Title>
    </Fade>
  );
};

const ParagraphRenderer = (props) => {
  let style = {};

  if (props.style) {
    style = props.style;
  } else if (typeof props === "object") {
    style = { ...(props?.children?.[0]?.props?.style || {}) };
  }

  return (
    <Fade triggerOnce>
      <Typography
        variant="body2"
        sx={{
          lineHeight: 1.7,
          pb: 0.5,
          whiteSpace: "pre-line",
          ...(props.sx || {}),
          ...style,
          "&: span": {
            width: "100%",
          },
        }}
      >
        {props.children}
      </Typography>
    </Fade>
  );
};

const CustomRenderer = (props) => {
  if (props.className?.includes("math")) {
    return (
      <Fade triggerOnce>
        <MarkdownComponent value={props.children[0]} />
      </Fade>
    );
  }

  return <div>{props.children}</div>;
};

const ImageRenderer = (props) => {
  return (
    <Fade triggerOnce>
      <img
        loading="lazy"
        src={props.src}
        alt={props.alt}
        style={{ width: "100%", objectFit: "contain" }}
      />
    </Fade>
  );
};

const DividerRenderer = () => {
  return <Divider sx={{ my: 3 }} />;
};

const MarkdownBody = ({ markdown, headingStyle = {}, paragraphStyle = {} }) => {
  return (
    <Box
      sx={{
        height: "100%",
        typography: "body2",
        "& li": { mb: 1 },
        // whiteSpace: "pre-line",
      }}
    >
      <ReactMarkdown
        rehypePlugins={[RemarkMathPlugin, rehypeRaw]}
        components={{
          h1: (_props) =>
            HeadingRenderer({ ..._props, sx: { ...headingStyle } }),
          h2: (_props) =>
            HeadingRenderer({ ..._props, sx: { ...headingStyle } }),
          h3: (_props) =>
            HeadingRenderer({ ..._props, sx: { ...headingStyle } }),
          h4: (_props) =>
            HeadingRenderer({ ..._props, sx: { ...headingStyle } }),
          h5: (_props) =>
            HeadingRenderer({ ..._props, sx: { ...headingStyle } }),
          h6: (_props) =>
            HeadingRenderer({ ..._props, sx: { ...headingStyle } }),
          p: (_props) =>
            ParagraphRenderer({ ..._props, sx: { ...paragraphStyle } }),
          div: CustomRenderer,
          img: ImageRenderer,
          hr: DividerRenderer,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </Box>
  );
};

export default React.memo(MarkdownBody);
