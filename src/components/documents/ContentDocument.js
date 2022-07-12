import ScrollSpy from "@components/ScrollSpy";
import { Box, Container, Stack, Typography } from "@mui/material";
import { flattenChildren } from "@utils/helperFunctions";
import {
  addChapters,
  createSlug,
  createTitle,
  extractHeadingsFromMd,
  getLevel,
  parseDepths,
} from "@utils/markdown";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import CodeRenderer from "./CodeRenderer";

// function HeadingRenderer(props) {
//   var children = React.Children.toArray(props.children);
//   var text = children.reduce(flattenChildren, "");
//   var slug = createSlug(text);
//   return React.createElement("h" + props.level, { id: slug }, props.children);
// }

function HeadingRenderer(props) {
  const level = props.level;

  var children = React.Children.toArray(props.children);
  var text = children.reduce(flattenChildren, "");
  var slug = createSlug(text);

  const isBigText = level <= 5;

  return (
    <>
      <Typography
        variant={`h${level}`}
        sx={{
          my: isBigText ? 2 : 1.2,
          // borderTop: isBigText && "2px solid grey",
          // borderBottom: isBigText && "2px solid grey",
          py: isBigText && 0.5,
          textAlign: isBigText && "center",
        }}
        id={slug}
      >
        {props.children}
      </Typography>
    </>
  );
}

function ParagraphRenderer(props) {
  return <Typography sx={{ pb: 1 }}>{props.children}</Typography>;
}

const ContentDocument = ({ data = {}, user, next = {}, previous = {} }) => {
  const [document, setDocument] = useState(data);
  const [ids, setIds] = useState([]);
  const router = useRouter();

  const uid = user?._id;

  var {
    _id,
    title,
    username,
    markdown,
    timestamp,
    contributors,
    views,
    likes,
    author,
  } = document || {};

  const liked = !!likes?.includes?.(uid);

  // Edit Button condition here
  const isLoggedIn = !!user?.authenticated; //&& user?._id === author;

  // Generate all Ids from markdown headings
  useEffect(() => {
    if (markdown) {
      const headers = extractHeadingsFromMd(markdown);
      const _ids = headers?.reduce((acc, header) => {
        const title = createTitle(header);
        const slug = createSlug(title);
        const level = getLevel(header);
        return [...acc, { title, slug, level }];
      }, []);

      const _temp2 = parseDepths(_ids || []);
      const _temp3 = addChapters(_temp2 || []);

      setIds(_temp3 || []);
    }
  }, [markdown]);

  const triggerLike = async () => {
    const res = await fetch(
      `/api/documents?_id=${_id}&uid=${uid}&like=${!liked}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Something's wrong");
      })
      .then((data) => {
        setDocument((old) => ({ ...old, likes: data.message.value.likes }));
      });
  };

  const _temp = markdown
    .replace(
      "==box-grey==",
      "<div style='background-color:lightgrey; padding: 1rem;'>"
    )
    .replace("==/box-grey==", "</div>");

  return (
    <Container maxWidth="xl">
      <Stack direction="row" spacing={5}>
        {ids.length > 0 && (
          <Box sx={{ py: 5 }}>
            {/* <BackButton sx={{ mb: { xs: 1, md: 2 } }} /> */}
            <ScrollSpy title="Table of Content" data={ids} />
          </Box>
        )}

        <Container sx={{ py: 5, backgroundColor: "#fff" }}>
          <Stack spacing={3}>
            {/* <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              justifyContent="space-between"
            >
              {isLoggedIn && (
                <RoundedButton
                  icon={<EditIcon fontSize="small" />}
                  href={`/studio/edit/documents/${_id}`}
                >
                  Edit
                </RoundedButton>
              )}
            </Stack> */}

            {/* <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Stack direction="row" spacing={1}>
                <Brightness1Icon sx={{ fontSize: 18, mt: 0.1 }} />
                <Stack>
                  <Link href={`/profile/123`} passHref>
                    <Typography sx={{ cursor: "pointer" }}>
                      Author: {username}
                    </Typography>
                  </Link>
                  <Typography>
                    Contributors:{" "}
                    {contributors &&
                      contributors.map(
                        (person, i) =>
                          `${person}${i < contributors.length - 1 ? ", " : ""}`
                      )}
                  </Typography>
                </Stack>
              </Stack>
            </Stack> */}

            {/* <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <VisibilityIcon fontSize="small" />
                <Typography>Views: {views}</Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Button
                  size="small"
                  onClick={triggerLike}
                  sx={(theme) => ({ color: theme.palette.primary.inverse })}
                >
                  {liked ? (
                    <FavoriteIcon fontSize="small" sx={{ mr: 0.7 }} />
                  ) : (
                    <FavoriteBorderIcon fontSize="small" sx={{ mr: 0.7 }} />
                  )}
                  Likes: {likes?.length || 0}
                </Button>
              </Stack>
            </Stack>

            <Divider sx={{ mb: 3 }} /> */}

            <Box
              sx={{
                minHeight: "50vh",
                "& img": {
                  maxWidth: "90%",
                },
              }}
            >
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: HeadingRenderer,
                  h2: HeadingRenderer,
                  h3: HeadingRenderer,
                  h4: HeadingRenderer,
                  h5: HeadingRenderer,
                  h6: HeadingRenderer,
                  p: ParagraphRenderer,
                  code: CodeRenderer,
                }}
              >
                {markdown}
              </ReactMarkdown>
            </Box>

            {/* <NextPreviousButton {...next} {...previous} /> */}
          </Stack>
        </Container>
      </Stack>
    </Container>
  );
};

export default ContentDocument;
