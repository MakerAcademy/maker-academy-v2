import { Typography } from "@mui/material";

const Title = ({ children, variant = "h6", sx = {}, ...props }) => {
  const _variant =
    typeof variant === "object"
      ? {
          xs: variant.xs,
          sm: variant.sm || variant.xs,
          md: variant.md || variant.sm || variant.xs,
          lg: variant.lg || variant.md || variant.sm || variant.xs,
          xl:
            variant.xl || variant.lg || variant.md || variant.sm || variant.xs,
        }
      : variant;

  return (
    <Typography
      variant={variant !== "object" && variant}
      sx={{
        color: "text.title",
        typography: typeof _variant === "object" && { ..._variant },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default Title;
