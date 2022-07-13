import ScrollSpy from "@components/ScrollSpy";
import Title from "@components/Title";
import { useAppSelector } from "@hooks/useRedux";
import DescriptionIcon from "@mui/icons-material/Description";
import TimerIcon from "@mui/icons-material/Timer";
import { Box, Container, Stack, Typography } from "@mui/material";
import {
  addChapters,
  createSlug,
  createTitle,
  extractHeadingsFromMd,
  getLevel,
  parseDepths,
} from "@utils/markdown";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MarkdownBody from "./MarkdownBody";

const ContentDocument = ({ data = {} }) => {
  const { user } = useAppSelector((state) => state.user);

  const [document, setDocument] = useState(data);
  const [ids, setIds] = useState([]);
  const router = useRouter();

  const uid = user?._id;

  var {
    _id,
    title,
    description,
    username,
    duration,
    markdown,
    timestamp,
    updatedTimestamp,
    contributors,
    level,
    views,
    likes,
    author,
    thumbnail = "https://thumbs.dreamstime.com/b/bitcoin-banner-golden-digital-currency-cryptocurrency-futuristic-money-technology-worldwide-network-concept-vector-206771631.jpg",
  } = document || {};

  const liked = !!likes?.includes?.(uid);

  // Edit Button condition here
  const isLoggedIn = !!user?.uid;

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
        {/* Left side scrollspy */}
        {ids.length > 0 && (
          <Box sx={{ py: 5 }}>
            {/* <BackButton sx={{ mb: { xs: 1, md: 2 } }} /> */}
            <ScrollSpy title="Table of Content" data={ids} />
          </Box>
        )}

        {/* Right side content */}
        <Container sx={{ py: 5 }}>
          <Stack spacing={3}>
            {/* Breadcrumbs */}
            <Typography>Breadcrumbs here</Typography>

            {/* Image */}
            <Box
              sx={{
                position: "relative",
                minHeight: 300,
                width: "100%",
                mb: 3,
              }}
            >
              <Image
                src={thumbnail}
                loader={() => thumbnail}
                alt={title}
                layout="fill"
                objectFit="cover"
                style={{
                  borderRadius: "12px",
                }}
              />
            </Box>

            {/* Title */}
            <Title variant={{ xs: "h3", md: "h2" }}>{title}</Title>

            {/* Description */}
            <Typography>{description}</Typography>

            {/* Details */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems="center"
              spacing={{ xs: 2, md: 3, lg: 4 }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.5}
                sx={{
                  px: 1,
                  py: 0.5,
                  backgroundColor: "rgba(249,166,6,0.1)",
                  color: "rgba(249,166,6)",
                  borderRadius: 2,
                }}
              >
                <DescriptionIcon sx={{ fontSize: 17 }} />
                <Typography variant="body2">{level}</Typography>
              </Stack>

              <Typography variant="body2">
                Published {moment(timestamp).format("ll")}
              </Typography>

              {updatedTimestamp && (
                <Typography variant="body2">
                  Updated {moment(updatedTimestamp).format("ll")}
                </Typography>
              )}

              <Stack direction="row" alignItems="center" spacing={0.5}>
                <TimerIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">{duration} mins</Typography>
              </Stack>
            </Stack>

            {/* Markdown Body */}
            <MarkdownBody markdown={markdown} />

            {/* <NextPreviousButton {...next} {...previous} /> */}
          </Stack>
        </Container>
      </Stack>
    </Container>
  );
};

export default ContentDocument;
