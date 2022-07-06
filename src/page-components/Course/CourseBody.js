import {
  Box,
  Container,
  Divider,
  Grid,
  Tab,
  Tabs,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import Content from "./Content";
import Overview from "./Overview";
import CourseCard from "./CourseCard";

const CourseBody = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Grid container spacing={5}>
        {/* Content */}
        <Grid item xs={12} md={8} lg={9}>
          <Tabs
            value={tabValue}
            onChange={(e, v) => setTabValue(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiButtonBase-root": {
                textTransform: "inherit",
                color: grey[700],
                fontWeight: 400,
              },
              "& .Mui-selected": {
                color: theme.palette.primary.main,
              },
            }}
          >
            <Tab label="Overview" />
            <Tab label="Course content" />
            <Tab label="Instructor" />
            <Tab label="Reviews" />
          </Tabs>
          <Divider />

          <Box sx={{ my: 5 }}>
            {tabValue === 0 && <Overview />}

            {tabValue === 1 && <Content />}
          </Box>
        </Grid>

        {/* Card */}
        <Grid item xs={12} md={4} lg={3} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              position: "sticky",
              top: 20,
              [theme.breakpoints.up("md")]: {
                my: -20,
              },
              [theme.breakpoints.up("lg")]: {
                my: -30,
              },
            }}
          >
            <CourseCard />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseBody;
