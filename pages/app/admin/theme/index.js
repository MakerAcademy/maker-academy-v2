import { createTheme } from "@config/theme";
import { Container, Grid } from "@mui/material";
import React, { useMemo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import okaidia from "react-syntax-highlighter/dist/cjs/styles/prism/okaidia";
import prettier from "prettier/standalone";
import babylon from "prettier/parser-babel";

const formatCode = (code) => {
  const formattedCode = prettier.format(code, {
    parser: "babel",
    plugins: [babylon],
  });

  return formattedCode;
};

const ThemePage = () => {
  const darkTheme = createTheme("dark");
  const lightTheme = createTheme("light");

  const dark = useMemo(() =>
    formatCode("const dark = " + JSON.stringify(darkTheme))
  );
  const light = useMemo(() =>
    formatCode("const light = " + JSON.stringify(lightTheme))
  );

  return (
    <Container sx={{ my: 5 }} maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SyntaxHighlighter
            language="json"
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
            {light}
          </SyntaxHighlighter>
        </Grid>

        <Grid item xs={6}>
          <SyntaxHighlighter
            language="json"
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
            {dark}
          </SyntaxHighlighter>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ThemePage;
