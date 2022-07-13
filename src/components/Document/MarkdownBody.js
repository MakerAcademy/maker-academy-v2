import Title from "@components/Title";
import { Box, Typography } from "@mui/material";
import { flattenChildren } from "@utils/helperFunctions";
import { createSlug } from "@utils/markdown";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

// function HeadingRenderer(props) {
//   var children = React.Children.toArray(props.children);
//   var text = children.reduce(flattenChildren, "");
//   var slug = createSlug(text);
//   return React.createElement("h" + props.level, { id: slug }, props.children);
// }

function HeadingRenderer(props) {
  const level = props.level;

  var children = React.Children.toArray(props.children);
  var text = children.reduce(flattenChildren, "");
  var slug = createSlug(text);

  const isBigText = level <= 5;

  return (
    <>
      <Title
        variant={`h${level}`}
        sx={{
          my: isBigText ? 2 : 1.2,
          // borderTop: isBigText && "2px solid grey",
          // borderBottom: isBigText && "2px solid grey",
          py: isBigText && 0.5,
          textAlign: isBigText && "center",
        }}
        id={slug}
      >
        {props.children}
      </Title>
    </>
  );
}

function ParagraphRenderer(props) {
  return <Typography sx={{ pb: 1 }}>{props.children}</Typography>;
}

const MarkdownBody = ({ markdown }) => {
  return (
    <Box
      sx={{
        minHeight: "50vh",
        "& img": {
          maxWidth: "90%",
        },
      }}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: HeadingRenderer,
          h2: HeadingRenderer,
          h3: HeadingRenderer,
          h4: HeadingRenderer,
          h5: HeadingRenderer,
          h6: HeadingRenderer,
          p: ParagraphRenderer,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownBody;
