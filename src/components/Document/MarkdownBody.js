import MarkdownComponent from "@components/markdownElements";
import MdVoteResults from "@components/markdownElements/MdVoteResults";
import Title from "@components/Title";
import { Box, Typography } from "@mui/material";
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

export const HeadingRenderer = (props) => {
  const level = props.level;

  var children = React.Children.toArray(props.children);
  var text = children.reduce(flattenChildren, "");
  var slug = createSlug(text);

  const isBigText = level <= 5;
  const align = props.align || "center";

  return (
    <>
      <Fade triggerOnce>
        <Title
          variant={`h${level}`}
          sx={{
            my: isBigText ? 2 : 1.2,
            py: isBigText && 0.5,
            textAlign: isBigText && align,
            color: "text.title",
            ...(props.sx || {}),
          }}
          id={slug}
        >
          {props.children}
        </Title>
      </Fade>
    </>
  );
};

export const ParagraphRenderer = (props) => {
  return (
    <Typography sx={{ pb: 0.5, whiteSpace: "pre-line" }}>
      {props.children}
    </Typography>
  );
};

const CustomRenderer = (props) => {
  if (props.className?.includes("math")) {
    return <MarkdownComponent value={props.children[0]} />;
  }

  return <div>{props.children}</div>;
};

const MarkdownBody = ({ markdown }) => {
  return (
    <Box
      sx={{
        minHeight: "50vh",
        "& img": {
          // maxWidth: "90%",
        },
      }}
    >
      <ReactMarkdown
        rehypePlugins={[RemarkMathPlugin, rehypeRaw]}
        components={{
          h1: HeadingRenderer,
          h2: HeadingRenderer,
          h3: HeadingRenderer,
          h4: HeadingRenderer,
          h5: HeadingRenderer,
          h6: HeadingRenderer,
          p: ParagraphRenderer,
          div: CustomRenderer,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownBody;
