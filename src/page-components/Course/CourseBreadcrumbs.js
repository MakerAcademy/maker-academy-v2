import { Box, Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";

const CourseBreadcrumbs = ({ title }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {/* <Link href="/" passHref>
          <Typography
            sx={{
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Home
          </Typography>
        </Link> */}

        <Link href="/content?contentType=courses" passHref>
          <Typography
            sx={{
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Courses
          </Typography>
        </Link>

        <Typography color="text.primary">{title}</Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default CourseBreadcrumbs;
