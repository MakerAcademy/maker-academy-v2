/* eslint-disable no-unused-vars */
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { validateFileType } from "@utils/helperFunctions";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Controller } from "react-hook-form";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Title from "@components/Title";
import hex from "@utils/hexTransparency";

const Dropzone = ({
  onChange,
  multiple,
  children,
  exists,
  restrict,
  acceptedFilesTitle,
  ...rest
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const onDrop = useCallback((file) => {
    if (!multiple) {
      if (validateFileType(file, restrict)) {
        onChange?.(file?.[0]);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: !!multiple,
  });

  if (children) {
    return (
      <Box {...getRootProps()} {...rest}>
        <input {...getInputProps({ onChange })} />
        {children}
      </Box>
    );
  }

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      {...getRootProps()}
      sx={{
        border: `2px solid ${theme.palette.primary.main}`,
        borderStyle: "dashed",
        minHeight: 120,
        borderRadius: "12px",
        p: 2,
        backgroundColor:
          exists &&
          (isDark
            ? `${theme.palette.primary.main}${hex["70%"]}`
            : `${theme.palette.primary.main}${hex["30%"]}`),
      }}
    >
      <CloudUploadOutlinedIcon sx={{ mb: 0.5, fontSize: 48 }} />

      <Typography sx={{ fontWeight: 600 }}>
        {"Drag & drop to upload"}
      </Typography>
      <Typography variant="caption">or browse</Typography>

      {acceptedFilesTitle && (
        <Typography variant="caption" sx={{ mt: 0.5 }}>
          {acceptedFilesTitle}
        </Typography>
      )}

      {isDragActive && <Typography>Drop the files here ...</Typography>}
    </Stack>
  );
};

const FormDropzone = ({ multiple, name, control, children, ...rest }) => {
  return (
    <Controller
      render={({ field: { onChange } }) => {
        return (
          <Dropzone multiple={multiple} onChange={onChange} {...rest}>
            {children}
          </Dropzone>
        );
      }}
      name={name}
      control={control}
      defaultValue=""
    />
  );
};

export default FormDropzone;
