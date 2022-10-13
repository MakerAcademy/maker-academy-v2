import Title from "@components/Title";
import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import ContentCards from "@page-components/Content/ContentCards";
import FilterMenu from "@page-components/Content/FilterMenu";
import { BlurSection1, BlurSection3 } from "@page-components/Home/images";
import useTranslation from "next-translate/useTranslation";
import ContentBannerLight from "@assets/images/backgrounds/content-banner-light.png";
import ContentBannerDark from "@assets/images/backgrounds/content-banner-dark.png";

const Content = ({ query }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { t } = useTranslation("content");

  return (
    <Box sx={{ py: { xs: 5, md: 7 }, position: "relative" }}>
      <img
        loading="lazy"
        src={BlurSection1}
        alt="Blur 1"
        style={{
          maxWidth: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          // filter: isDark ? "blur(180px)" : "blur(100px)",
          opacity: isDark ? 0.2 : 0.5,
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          mt: 8,
          mb: { xs: 3, md: 5 },
          [theme.breakpoints.up("md")]: {
            px: 8,
          },
          [theme.breakpoints.up("lg")]: {
            px: 3,
          },
        }}
      >
        {/* Explore Box */}
        <Box sx={{ position: "relative", width: "100%" }}>
          <img
            src={isDark ? ContentBannerDark : ContentBannerLight}
            alt={"Maker Academy Content Banner"}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
              maxWidth: "100%",
            }}
          />

          <Box sx={{ position: "absolute", top: 0, left: 0 }}>
            <Stack
              spacing={2}
              // justifyContent="center"
              // alignItems="center"
              sx={{ p: { xs: 4, md: 8 } }}
            >
              <Title
                variant={{ xs: "h4", md: "h2" }}
                sx={{ fontWeight: "600!important" }}
              >
                {t("explore_the_academy")}
              </Title>

              <Typography>
                {t("content_banner_description")}
              </Typography>
            </Stack>
          </Box>
        </Box>

        <Box sx={{ pt: 6, pb: 6 }}>
          <FilterMenu />
        </Box>

        <Box>
          <ContentCards query={query} />
        </Box>
      </Container>
    </Box>
  );
};

export default Content;

export const getServerSideProps = async (context) => {
  return { props: { query: context.query } };
};
