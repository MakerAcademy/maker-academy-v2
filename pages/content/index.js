import Title from "@components/Title";
import { Box, Container } from "@mui/material";
import ContentCards from "@page-components/Content/ContentCards";
import FilterMenu from "@page-components/Content/FilterMenu";
import useTranslation from "next-translate/useTranslation";

const Content = ({ query }) => {
  const { t } = useTranslation("content");

  return (
    <Box sx={{ py: { xs: 5, md: 7 } }}>
      <Container maxWidth="lg" sx={{ mb: { xs: 3, md: 5 } }}>
        <Title
          variant={{ xs: "h4", md: "h3" }}
          sx={{ fontWeight: "600!important" }}
        >
          {t("explore_the_academy")}
        </Title>
      </Container>

      <FilterMenu />

      <Container maxWidth="lg" sx={{ my: 7, minHeight: "40vh" }}>
        <ContentCards query={query} />
      </Container>
    </Box>
  );
};

export default Content;

export const getServerSideProps = async (context) => {
  return { props: { query: context.query } };
};
