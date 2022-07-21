import { Box, Typography, useTheme } from "@mui/material";
import "@toast-ui/editor/dist/toastui-editor.css";
import dynamic from "next/dynamic";
import { Editor } from "@toast-ui/react-editor";
import { useRef } from "react";
import { Controller } from "react-hook-form";

// const Editor = dynamic(
//   () => import("@toast-ui/react-editor").then((m) => m.Editor),
//   { ssr: false }
// );

const FormMarkdown = ({ name, control, sx = {}, label, ...props }) => {
  const theme = useTheme();
  const editor = useRef();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ...field }, fieldState: { error }, formState }) => (
        <Box
          sx={{
            minHeight: 400,
            cursor: props.disabled ? "not-allowed" : "auto",
            [theme.breakpoints.up("xl")]: {
              minHeight: 600,
            },
            "& > div": {
              minHeight: "inherit !important",
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
            {...props}
            {...field}
            initialValue={field?.value}
            onChange={() => {
              props.disabled
                ? null
                : field.onChange(editor?.current?.editorInst?.getMarkdown?.());
            }}
            ref={editor}
          />
          {error && <Typography>{error}</Typography>}
        </Box>
      )}
    />
  );
};

export default FormMarkdown;
