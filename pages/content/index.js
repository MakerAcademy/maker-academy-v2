import Title from "@components/Title";
import { Box, Container } from "@mui/material";
import ContentCards from "@page-components/Content/ContentCards";
import FilterMenu from "@page-components/Content/FilterMenu";

const Content = (props) => {
  return (
    <Box sx={{ py: { xs: 5, md: 7 } }}>
      <Container maxWidth="xl" sx={{ mb: { xs: 3, md: 5 } }}>
        <Title
          variant={{ xs: "h4", md: "h3" }}
          sx={{ fontWeight: "600!important" }}
        >
          Explore the Academy
        </Title>
      </Container>

      <FilterMenu />

      <Container maxWidth="xl" sx={{ my: 7, minHeight: "40vh" }}>
        <ContentCards />
      </Container>
    </Box>
  );
};

export default Content;

// export const getServerSideProps = async (context) => {
//   getContent();
//   return { props: { data: [] } };
// };
