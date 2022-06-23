import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { Container } from "@mui/material";
import { contentFetchData } from "@redux/slices/contentSlice";
import { useEffect } from "react";

const Content = (props) => {
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
    dispatch(contentFetchData());
  }, []);

  const fetchMorePosts = () => {
    dispatch(contentFetchData({ merge: true }));
  };

  return (
    <Container sx={{ my: 10 }}>
      {content?.length &&
        content.map(({ contentType, title, id }, i) => (
          <p key={id}>
            {i}: {title} {contentType} {id}
          </p>
        ))}

      {loading && <h1> Loading... </h1>}
      {!loading && !empty && (
        <button onClick={fetchMorePosts}>Fetch more Posts</button>
      )}
      {empty && <h1> There are no more data </h1>}
    </Container>
  );
};

export default Content;

// export const getServerSideProps = async (context) => {
//   getContent();
//   return { props: { data: [] } };
// };
