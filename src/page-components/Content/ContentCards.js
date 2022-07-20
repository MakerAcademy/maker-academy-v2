import GreenButton from "@components/buttons/GreenButton";
import ContentCard from "@components/cards/ContentCard";
import Title from "@components/Title";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { Box, Button, Container, Grid, Stack } from "@mui/material";
import { fetchContentData } from "@redux/slices/contentSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

  const { query } = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchContentData({
        contentType:
          query.contentType === "courses"
            ? "course"
            : query.contentType === "documents"
            ? "document"
            : null,
        author: query.author,
        categories: query.categories?.split(",") || [],
        difficulty: query.difficulty,
        category: query.category,
        searchTerm: query?.searchTerm,
        limit: 10,
      })
    );
  }, [query]);

  const fetchMorePosts = () => {
    dispatch(fetchContentData({ merge: true }));
  };

  return (
    <Box>
      <Grid container spacing={4}>
        {content?.length > 0 &&
          content.map((item, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
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
