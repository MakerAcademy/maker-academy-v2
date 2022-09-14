import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const FormSelectField = ({
  name,
  control,
  sx = {},
  options = [],
  variant = "outlined",
  label,
  fullWidth = true,
  t,
  ...props
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error }, formState }) => {
        return (
          <FormControl
            fullWidth={fullWidth}
            size="small"
            sx={{
              height: "auto",
              ".MuiInputBase-root": {
                minHeight: 45,
                height: "100%",
                borderRadius: "8px",
                // fontSize: 14,
                fontWeight: 300,
              },
              ...sx,
            }}
            variant={variant}
          >
            <InputLabel id="select-field">{label}</InputLabel>
            <Select
              id="select-field"
              // helperText={error ? error.message : null}
              error={!!error}
              label={label}
              {...props}
              {...field}
              value={field.value || ""}
              sx={{ maxHeight: 45 }}
            >
              {options?.map((item) => (
                <MenuItem key={item} value={item}>
                  {t ? t(item) : item}
                </MenuItem>
              ))}
            </Select>

            <FormHelperText error={!!props?.helperText || !!error?.message}>
              {props?.helperText || error?.message}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};

export default FormSelectField;
