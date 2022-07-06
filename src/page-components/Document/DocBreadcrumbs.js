import { NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_MOBILE } from "@constants/";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import moment from "moment";

const DocumentBreadcrumbs = ({ title, description, timestamp, thumbnail }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: `${NAVBAR_HEIGHT_MOBILE}px`,
        [theme.breakpoints.up("md")]: {
          pt: `${NAVBAR_HEIGHT_DESKTOP}px`,
        },
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ textAlign: "center" }}
      >
        <Typography variant="h3" sx={{ mb: { xs: 3, md: 5 } }}>
          {title}
        </Typography>

        <Typography
          sx={{ maxWidth: 650, fontWeight: 300, mb: { xs: 3, md: 4 } }}
        >
          {description}
        </Typography>

        <Typography sx={{ fontWeight: 600 }}>
          Posted {moment(timestamp).format("LL")}
        </Typography>
      </Stack>
    </Box>
  );
};

export default DocumentBreadcrumbs;
