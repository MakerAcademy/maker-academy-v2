import {
  HeadingRenderer,
  ParagraphRenderer,
} from "@components/Document/MarkdownBody";
import { Box } from "@mui/material";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const MarkdownBox = ({ data }) => {
  const { body, align = "left" } = data;

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "primary.grey2",
        borderRadius: "10px",
        textAlign: align,
      }}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: (_props) =>
            HeadingRenderer({
              ..._props,
              sx: { textAlign: align, mt: 0, mb: 1 },
            }),
          h2: (_props) =>
            HeadingRenderer({
              ..._props,
              sx: { textAlign: align, mt: 0, mb: 1 },
            }),
          h3: (_props) =>
            HeadingRenderer({
              ..._props,
              sx: { textAlign: align, mt: 0, mb: 1 },
            }),
          h4: (_props) =>
            HeadingRenderer({
              ..._props,
              sx: { textAlign: align, mt: 0, mb: 1 },
            }),
          h5: (_props) =>
            HeadingRenderer({
              ..._props,
              sx: { textAlign: align, mt: 0, mb: 1 },
            }),
          h6: (_props) =>
            HeadingRenderer({
              ..._props,
              sx: { textAlign: align, mt: 0, mb: 1 },
            }),
          p: ParagraphRenderer,
        }}
      >
        {body}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownBox;
