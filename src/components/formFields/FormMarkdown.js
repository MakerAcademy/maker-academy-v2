import { Box, Stack, Typography, useTheme } from "@mui/material";
import "@toast-ui/editor/dist/toastui-editor.css";
import dynamic from "next/dynamic";
import { Editor } from "@toast-ui/react-editor";
import { useRef } from "react";
import { Controller } from "react-hook-form";
import ElementsTabs from "@components/markdownElements/ElementsTabs";

// const Editor = dynamic(
//   () => import("@toast-ui/react-editor").then((m) => m.Editor),
//   { ssr: false }
// );

const FormMarkdown = ({ name, control, sx = {}, label, ...props }) => {
  const theme = useTheme();
  const editor = useRef();

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        minHeight: 450,
        [theme.breakpoints.up("xl")]: {
          minHeight: 600,
        },
      }}
    >
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

      <ElementsTabs />
    </Stack>
  );
};

export default FormMarkdown;
