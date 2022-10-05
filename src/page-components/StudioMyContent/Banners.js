import Title from "@components/Title";
import {
  Box,
  Button,
  Grid,
  Hidden,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import Link from "next/link";

const LIGHT_TRANSPARENCY = "1A";
const DARK_TRANSPARENCY = "33";

const CustomCard = ({
  title,
  description,
  image = "https://static.vecteezy.com/system/resources/previews/001/204/727/non_2x/pencil-png.png",
  buttonText,
  color,
  href,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 4,
        height: "100%",
        width: "100%",
        backgroundColor: `${color}${
          theme.palette.mode === "light"
            ? LIGHT_TRANSPARENCY
            : DARK_TRANSPARENCY
        }`,
        borderRadius: 5,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        // alignItems="center"
        justifyContent="space-between"
        sx={{ height: "100%" }}
      >
        <Stack spacing={2} alignItems="flex-start" sx={{ height: "100%" }}>
          <Title variant="h6">{title}</Title>

          <Typography variant="body2" sx={{ flex: 1 }}>
            {description}
          </Typography>

          <Link href={href} passHref>
            <Button sx={{ color, textTransform: "inherit", p: 0 }}>
              {buttonText}
              <ArrowForwardOutlinedIcon sx={{ ml: 1, fontSize: 18 }} />
            </Button>
          </Link>
        </Stack>

        {/* <Hidden lgDown>
          <img
            src={image}
            alt={title}
            style={{
              height: "100%",
              maxHeight: 100,
              objectFit: "contain",
            }}
          />
        </Hidden> */}
      </Stack>
    </Box>
  );
};

const Banners = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={4}>
        <CustomCard
          title="Create an Article"
          description="Publish an article to the Maker Academy."
          buttonText="Create an article"
          color="#1AAB9B"
          href="/app/studio/new/document"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CustomCard
          title="Create a course"
          description="Courses are a collection of articles with an optional user assessment."
          buttonText="Create a course"
          color="#FF9800"
          href="/app/studio/new/course"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CustomCard
          title="Create an assessment"
          description="Add assesments to your courses and evaluate user knowledge."
          buttonText="Create assessment"
          color="#00bfff"
          href="/app/studio/new/assessment"
        />
      </Grid>
    </Grid>
  );
};

export default Banners;
