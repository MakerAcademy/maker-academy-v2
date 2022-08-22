import { Box, Tooltip, Typography } from "@mui/material";
import { parseLineBreaks } from "@utils/helperFunctions";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import okaidia from "react-syntax-highlighter/dist/cjs/styles/prism/okaidia";
import prettier from "prettier/standalone";
import babylon from "prettier/parser-babel";

const MdCode = ({ data }) => {
  const { code, language = "javascript" } = data || {};

  // const formattedCode = prettier.format(code, {
  //   parser: "babel",
  //   plugins: [babylon],
  // });

  // const _code = parseLineBreaks(code);

  return (
    <Box sx={{ mb: 3 }}>
      <SyntaxHighlighter
        language={language}
        style={okaidia}
        lineProps={{
          style: {
            wordBreak: "break-all",
            whiteSpace: "pre-wrap",
            fontSize: 14,
          },
        }}
        showLineNumbers
        wrapLines
      >
        {code}
      </SyntaxHighlighter>
    </Box>
  );
};

export default MdCode;
