import ElementsTabs from "@components/markdownElements/ElementsTabs";
import {
  Box,
  FormHelperText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
import "@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import "tui-color-picker/dist/tui-color-picker.css";

// const Editor = dynamic(
//   () => import("@toast-ui/react-editor").then((m) => m.Editor),
//   { ssr: false }
// );

const FormMarkdown = ({ name, control, sx = {}, label, ...props }) => {
  const [commandsAdded, setCommandsAdded] = useState(false);
  const [ButtonAdded, setButtonAdded] = useState(false);
  const theme = useTheme();
  const editor = useRef();

  useEffect(() => {
    if (editor && !commandsAdded) {
      const _editor = editor?.current?.getInstance();

      _editor.addCommand("markdown", "underline", function underline(data) {
        const _text = _editor.getSelectedText();
        _editor.insertText(
          `<span style="text-decoration: underline;">${_text}</span>`
        );
      });

      _editor.addCommand("markdown", "linebreak", function linebreak(data) {
        _editor.insertText("<br />");
      });

      _editor.addCommand("markdown", "center", function center(data) {
        const _text = _editor.getSelectedText();
        _editor.insertText(`<p style="text-align: center;">${_text}</p>`);
      });

      _editor.insertToolbarItem(
        { groupIndex: 0, itemIndex: 4 },
        {
          name: "underline",
          tooltip: "Underline",
          command: "underline",
          text: "__",
          className: "toastui-editor-toolbar-icons last",
          style: { backgroundImage: "none" },
        }
      );

      _editor.insertToolbarItem(
        { groupIndex: 1, itemIndex: 0 },
        {
          name: "lineBreak",
          tooltip: "Line Break",
          command: "linebreak",
          text: "BR",
          className: "toastui-editor-toolbar-icons last",
          style: { backgroundImage: "none" },
        }
      );

      _editor.insertToolbarItem(
        { groupIndex: 0, itemIndex: 5 },
        {
          name: "center",
          tooltip: "Center Text",
          command: "center",
          text: "<ǁ>",
          className: "toastui-editor-toolbar-icons last",
          style: { backgroundImage: "none" },
        }
      );

      setTimeout(() => {
        setCommandsAdded(true);
      }, 100);
    }
  }, [editor, commandsAdded]);

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
              "& .toastui-editor-defaultUI": {
                minHeight: "inherit !important",
              },
              // "&.toastui-editor-mode-switch": { display: "none" },
              "& .toastui-editor-md-preview": { display: "none !important" },
              "& .toastui-editor-md-splitter": { display: "none !important" },
              "& .toastui-editor.md-mode": { width: "100% !important" },
              ...sx,
            }}
            data-color-mode={theme.palette.mode}
          >
            {label && <Typography sx={{ pb: 1 }}>{label}</Typography>}

            <Editor
              hideModeSwitch
              // theme={theme.palette.mode}
              previewStyle={"vertical"}
              initialEditType="markdown"
              plugins={[
                colorSyntax,
                tableMergedCell,
                [codeSyntaxHighlight, { highlighter: Prism }],
              ]}
              toolbarItems={[
                ["heading", "bold", "italic"],
                ["hr", "quote"],
                ["ul", "ol", "task"],
                ["table", "link"],
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
            <FormHelperText error={!!props?.helperText || !!error?.message}>
              {props?.helperText || error?.message}
            </FormHelperText>
          </Box>
        )}
      />
    </Stack>
  );
};

export default FormMarkdown;
