import ContentCard from "@components/cards/ContentCard";
import { Box, Container, Grid, Tab, Tabs, useTheme } from "@mui/material";
import hex from "@utils/hexTransparency";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { Zoom } from "react-awesome-reveal";
import { BlurSection3 } from "./images";

const DUMMY_CONTENT = [
  ...new Array(6).fill(null).map((_, i) => ({
    _id: i,
    thumbnail:
      "https://blog.makerdao.com/wp-content/uploads/2019/11/Product-blue-scaled.jpg",
    title: "Test Title",
    subtitle:
      "Voluptate minim non tempor consequat est qui mollit eu elit incididunt ut.",
    description:
      "Nisi aliquip adipisicing officia nulla. Anim fugiat mollit non ipsum mollit deserunt proident in proident ea pariatur ullamco. Lorem amet nisi id nisi exercitation excepteur quis culpa id aute. Nostrud laborum commodo officia officia incididunt nostrud commodo laborum excepteur exercitation do. Est ipsum esse laboris consectetur sunt minim est. Tempor ea ullamco pariatur ipsum deserunt duis aliquip deserunt pariatur amet proident occaecat. Officia est dolore occaecat non sint Lorem non ad minim enim amet sit cupidatat.",
    username: "makeracademy",
    topic: "Maker",
    duration: 30,
    contentType: i % 2 === 0 ? "documents" : "courses",
    level: "expert",
    timestamp: new Date(),
    brand: i % 2 === 0 && "maker",
    views: 17,
    likes: 6,
  })),
];

const TABS = [
  "section3_recent_releases",
  "section3_popular_articles",
  "section3_popular_courses",
];

const Section3 = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const { t } = useTranslation("home");

  const handleTabChange = (e, i) => {
    setTabValue(i);
  };

  return (
    <Box sx={{ my: 15, position: "relative" }}>
      <img
        loading="lazy"
        src={BlurSection3}
        alt="Blur 3"
        style={{
          maxWidth: "100%",
          position: "absolute",
          top: 230,
          left: 0,
          zIndex: -1,
          // filter: "blur(100px)",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          [theme.breakpoints.up("md")]: {
            px: 10,
          },
          [theme.breakpoints.up("lg")]: {
            px: 3,
          },
        }}
      >
        {/* Tabs */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: 3,
            ".MuiTabs-flexContainer": { gap: "10px" },
            "& .MuiTab-root.Mui-selected": {
              backgroundColor: `${theme.palette.primary.main}${hex["12%"]}`,
            },
          }}
          TabIndicatorProps={{ style: { background: "none" } }}
        >
          {TABS.map((item, i) => (
            <Tab
              key={i}
              label={t(item)}
              sx={{
                backgroundColor: `${theme.palette.primary.grey1}`,
                textTransform: "inherit",
                fontSize: "18px",
                fontWeight: 500,
                borderRadius: "12px",
              }}
            />
          ))}
        </Tabs>

        {/* Content */}
        <Grid container spacing={3}>
          {DUMMY_CONTENT.map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Zoom delay={100 * i} triggerOnce>
                <ContentCard {...item} />
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Section3;
