import ElementsTabs from "@components/markdownElements/ElementsTabs";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import Prism from "prismjs";
import { useRef } from "react";
import { Controller } from "react-hook-form";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
import "prismjs/themes/prism.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

// const Editor = dynamic(
//   () => import("@toast-ui/react-editor").then((m) => m.Editor),
//   { ssr: false }
// );

const FormMarkdown = ({ name, control, sx = {}, label, ...props }) => {
  const theme = useTheme();
  const editor = useRef();

  return (
    <Stack
      spacing={1}
      sx={{
        minHeight: 450,
        [theme.breakpoints.up("xl")]: {
          minHeight: 600,
        },
      }}
    >
      <ElementsTabs />

      <Controller
        name={name}
        control={control}
        render={({ field: { ...field }, fieldState: { error }, formState }) => (
          <Box
            sx={{
              width: "100%",
              cursor: props.disabled ? "not-allowed" : "auto",
              minHeight: "inherit",
              "& > div": {
                minHeight: "inherit !important",
                backgroundColor: "#fff",
              },
              "&.toastui-editor-defaultUI": {
                minHeight: "inherit !important",
              },
              "&.toastui-editor-mode-switch": { display: "none" },
              ...sx,
            }}
            data-color-mode={theme.palette.mode}
          >
            {label && <Typography sx={{ pb: 1 }}>{label}</Typography>}

            <Editor
              // theme={theme.palette.mode}
              previewStyle="vertical"
              initialEditType="markdown"
              plugins={[
                colorSyntax,
                tableMergedCell,
                [codeSyntaxHighlight, { highlighter: Prism }],
              ]}
              {...props}
              {...field}
              initialValue={field?.value}
              onChange={() => {
                props.disabled
                  ? null
                  : field.onChange(
                      editor?.current?.editorInst?.getMarkdown?.()
                    );
              }}
              ref={editor}
              // toolbarItems={["bold"]}
            />
            {error && <Typography>{error}</Typography>}
          </Box>
        )}
      />
    </Stack>
  );
};

export default FormMarkdown;
