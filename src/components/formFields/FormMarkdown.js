import ElementsTabs from "@components/markdownElements/ElementsTabs";
import {
  Box,
  FormHelperText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Controller, useWatch } from "react-hook-form";
import { EditorState, convertFromRaw } from "draft-js";

import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((m) => m.Editor),
  { ssr: false }
);

const markdownToEditorState = (_markdown) => {
  const _value = markdownToDraft(_markdown);
  const contentState = convertFromRaw(_value);

  const _editorState = EditorState.createWithContent(contentState);

  return _editorState;
};

const FormMarkdown = ({
  name,
  control,
  removeComponents,
  sx = {},
  label,
  ...props
}) => {
  const _markdown = useWatch({ control, name });

  const [editorState, setEditorState] = useState(
    markdownToEditorState(_markdown || "")
  );
  const theme = useTheme();

  return (
    <Stack
      spacing={1}
      sx={{
        minHeight: 450,
        [theme.breakpoints.up("xl")]: {
          minHeight: 600,
        },
        ...sx,
      }}
    >
      {!removeComponents && <ElementsTabs />}

      <Box
        sx={{
          p: 1,
          border: "1px solid lightgrey",
        }}
      >
        <Controller
          name={name}
          control={control}
          render={({ field: { ...field }, fieldState: { error } }) => {
            return (
              <Box
                sx={{
                  //   height: "100%",
                  width: "100%",
                  cursor: props.disabled ? "not-allowed" : "auto",
                  "& .rdw-editor-main": {
                    width: "100%",
                    maxHeight: 450,
                    [theme.breakpoints.up("xl")]: {
                      maxHeight: 600,
                    },
                    overflow: "auto",
                  },
                }}
              >
                {label && <Typography sx={{ pb: 1 }}>{label}</Typography>}

                <Editor
                  toolbar={{
                    options: ["inline", "list", "link", "emoji", "history"],
                    inline: {
                      inDropdown: false,
                      options: [
                        "bold",
                        "italic",
                        "underline",
                        "strikethrough",
                        "monospace",
                        "superscript",
                        "subscript",
                      ],
                    },
                  }}
                  {...props}
                  //   {...field}
                  editorState={editorState}
                  onChange={(e) => {
                    props.disabled ? null : field.onChange(draftToMarkdown(e));
                  }}
                  onEditorStateChange={(e) => setEditorState(e)}
                />

                <FormHelperText error={!!props?.helperText || !!error?.message}>
                  {props?.helperText || error?.message}
                </FormHelperText>
              </Box>
            );
          }}
        />
      </Box>
    </Stack>
  );
};

export default React.memo(FormMarkdown);
