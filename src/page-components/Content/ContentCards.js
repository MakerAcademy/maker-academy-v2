import GreenButton from "@components/buttons/GreenButton";
import ContentCard from "@components/cards/ContentCard";
import Title from "@components/Title";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { Box, Button, Container, Grid, Stack } from "@mui/material";
import { fetchContentData } from "@redux/slices/contentSlice";
import { useEffect } from "react";

const ContentCards = () => {
  const {
    content,
    filter,
    loading,
    order,
    pageSize,
    searchTerm,
    firstVisible,
    empty,
    lastVisible,
  } = useAppSelector((state) => state.content);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContentData());
  }, []);

  const fetchMorePosts = () => {
    dispatch(fetchContentData({ merge: true }));
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {content?.length &&
          content.map((item, i) => (
            <Grid item key={i}>
              <ContentCard {...item} />
            </Grid>
          ))}
      </Grid>

      <Stack
        width="100%"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: { xs: 5, md: 10 } }}
      >
        {loading && <Title variant="h6"> Loading... </Title>}

        {!loading && !empty && (
          <GreenButton variant="outlined" size="small" onClick={fetchMorePosts}>
            Fetch more Posts
          </GreenButton>
        )}

        {empty && <Title variant="h6"> There are no more data </Title>}
      </Stack>
    </Box>
  );
};

export default ContentCards;

// export const getServerSideProps = async (context) => {
//   getContent();
//   return { props: { data: [] } };
// };
