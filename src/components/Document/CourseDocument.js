import Title from "@components/Title";
import useDocRead from "@hooks/useDocRead";
import { useAppSelector } from "@hooks/useRedux";
import { listenOneContent } from "@lib/content";
import { updateUserReadDocument } from "@lib/document";
import { Box, Container, Stack, Typography } from "@mui/material";
import DocMetadata from "@page-components/Document/DocMetadata";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MarkdownBody from "./MarkdownBody";

const CourseDocument = ({ data = {} }) => {
  const { user } = useAppSelector((state) => state.user);
  const { profile } = useAppSelector((state) => state.profile);

  const [document, setDocument] = useState(data);
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

  const read = useDocRead(false, 500);
  const hasUserRead = profile?.readDocuments?.includes?.(id);

  useEffect(() => {
    if (profile?.id && !hasUserRead && read) {
      updateUserReadDocument(profile?.id, id);
    }
  }, [profile, read]);

  useEffect(() => {
    const unsub = listenOneContent(id, (res) => {
      setDocument((old) => ({ ...old, ...res }));
    });

    return () => {
      unsub?.();
    };
  }, []);

  return (
    <Box>
      <Stack spacing={3}>
        {/* Breadcrumbs */}
        {/* <DocumentBreadcrumbs /> */}

        {/* Image */}
        <Box
          sx={{
            position: "relative",
            height: "100%",
            minHeight: 260,
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
        <Box
          sx={{
            minHeight: "50vh",
          }}
        >
          <MarkdownBody markdown={markdown} />
        </Box>

        {/* <NextPreviousButton {...next} {...previous} /> */}
      </Stack>
    </Box>
  );
};

export default CourseDocument;
