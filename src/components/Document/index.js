import ScrollSpy from "@components/ScrollSpy";
import Title from "@components/Title";
import { useAppSelector } from "@hooks/useRedux";
import { listenOneContent } from "@lib/content";
import DescriptionIcon from "@mui/icons-material/Description";
import TimerIcon from "@mui/icons-material/Timer";
import { Box, Container, Hidden, Stack, Typography } from "@mui/material";
import DocumentBreadcrumbs from "@page-components/Document/DocBreadcrumbs";
import DocMetadata from "@page-components/Document/DocMetadata";
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
    id,
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

  useEffect(() => {
    const unsub = listenOneContent(id, (res) => {
      setDocument((old) => ({ ...old, ...res }));
    });

    return () => {
      unsub?.();
    };
  }, []);

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

  return (
    <Container maxWidth="xl">
      <Stack direction="row" spacing={5}>
        <Hidden smDown>
          {/* Left side scrollspy */}
          {ids?.length > 0 && (
            <Box sx={{ py: 5 }}>
              {/* <BackButton sx={{ mb: { xs: 1, md: 2 } }} /> */}
              <ScrollSpy title="Table of Content" data={ids} />
            </Box>
          )}
        </Hidden>

        {/* Right side content */}
        <Container sx={{ py: 5 }}>
          <Stack spacing={3}>
            {/* Breadcrumbs */}
            <DocumentBreadcrumbs />

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
            <DocMetadata {...document} />

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
