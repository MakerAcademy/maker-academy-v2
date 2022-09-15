import GreenButton from "@components/buttons/GreenButton";
import ContentCard from "@components/cards/ContentCard";
import Title from "@components/Title";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { Box, Grid, Stack } from "@mui/material";
import { fetchContentData } from "@redux/slices/contentSlice";
import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";

const ContentCards = ({ query }) => {
  const {
    content,
    filter,
    loading,
    order,
    pageSize,
    searchTerm,
    firstVisible,
    reachedLast,
    empty,
    lastVisible,
  } = useAppSelector((state) => state.content);

  const { t } = useTranslation("content");

  const dispatch = useAppDispatch();

  const fetchQueries = {
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
  };

  useEffect(() => {
    dispatch(fetchContentData(fetchQueries));
  }, [query]);

  const fetchMorePosts = () => {
    dispatch(fetchContentData({ merge: true, ...fetchQueries }));
  };

  return (
    <Box>
      <Grid container spacing={4}>
        {content?.length > 0 &&
          content.map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
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
        {loading && <Title variant="h6"> {t("loading")}... </Title>}

        {!loading && !empty && !reachedLast && (
          <GreenButton variant="outlined" size="small" onClick={fetchMorePosts}>
            {t("load_more")}
          </GreenButton>
        )}

        {empty && <Title variant="h6"> {t("no_data")} </Title>}
      </Stack>
    </Box>
  );
};

export default ContentCards;
