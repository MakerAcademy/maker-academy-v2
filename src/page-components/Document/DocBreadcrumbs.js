import { Box, Stack, Typography, useTheme } from "@mui/material";

const DocumentBreadcrumbs = ({ title, description, timestamp, thumbnail }) => {
  const theme = useTheme();

  return (
    <Box>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ textAlign: "center" }}
      >
        <Typography>Breadcrumbs here</Typography>
      </Stack>
    </Box>
  );
};

export default DocumentBreadcrumbs;
