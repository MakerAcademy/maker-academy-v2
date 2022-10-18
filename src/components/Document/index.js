import ScrollSpy from "@components/ScrollSpy";
import Title from "@components/Title";
import useDocRead from "@hooks/useDocRead";
import { useAppSelector } from "@hooks/useRedux";
import { listenOneContent } from "@lib/content";
import {
  DEFAULT_CONTENT_THUMBNAIL,
  updateUserReadDocument,
} from "@lib/document";
import { getContact } from "@lib/user";
import {
  Avatar,
  Box,
  Container,
  Hidden,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import DocMetadata from "@page-components/Document/DocMetadata";
import { createSlug } from "@utils/markdown";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useEffect, useState } from "react";
import MarkdownBody from "./MarkdownBody";

export const AuthorInBanner = ({ author, brand }) => {
  const theme = useTheme();
  // const [name, setName] = useState(brand);
  const [contact, setContact] = useState({});
  const { t } = useTranslation("common");

  useEffect(() => {
    getContact(author).then((res) => {
      setContact(res);
    });
  }, []);

  const usersName = `${contact?.firstName || ""} ${contact?.lastName || ""}`;

  return (
    <Link passHref href={`/u/${author}`} target="_blank">
      <Box
        sx={{
          cursor: "pointer",
          position: "absolute",
          right: "20px",
          bottom: "20px",
          bgcolor: "white",
          borderRadius: { xs: "16px", sm: "24px" },
          px: { xs: 1.5, sm: 2 },
          py: { xs: 1, sm: 1.5 },
          "&:hover": {
            boxShadow: theme.palette.boxShadows.shadow1,
          },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar
            src={contact?.profilePicture} //CONTENT_CARD_BRAND_STYLES[brand]?.logo
            sx={{
              height: "30px",
              width: "30px",
              [theme.breakpoints.up("sm")]: {
                height: "40px",
                width: "40px",
              },
            }}
          />

          <Stack>
            <Typography
              variant="body2"
              sx={{ fontWeight: 300, color: grey[500] }}
            >
              Author
            </Typography>

            <Typography
              variant="body2"
              sx={{ fontWeight: 500, color: grey[900] }}
            >
              {usersName}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Link>
  );
};

const ContentDocument = ({ data = {}, hideScrollspy, previewMode }) => {
  const { user } = useAppSelector((state) => state.user);
  const { profile } = useAppSelector((state) => state.profile);
  const { t } = useTranslation("content");
  const theme = useTheme();

  const [document, setDocument] = useState(data);

  var {
    id,
    title,
    description,
    username,
    duration,
    markdown,
    timestamp,
    category,
    updatedTimestamp,
    contributors,
    level,
    views,
    metadata,
    author,
    thumbnail = DEFAULT_CONTENT_THUMBNAIL,
  } = document || {};

  const read = useDocRead(false, 500);
  const hasUserRead = profile?.readDocuments?.includes?.(id);

  useEffect(() => {
    if (profile?.id && !hasUserRead && read && !previewMode) {
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
      <Stack direction="row" spacing={5}>
        {/* Left side scrollspy */}
        {!hideScrollspy && (
          <Hidden mdDown>
            <Box sx={{ py: 5 }}>
              <ScrollSpy
                title="Table of Content"
                firstItem={{ title, slug: createSlug(title), depth: 0 }}
                markdown={markdown}
              />
            </Box>
          </Hidden>
        )}

        {/* Right side content */}
        <Container maxWidth="md" sx={{ py: 5 }}>
          <Stack spacing={3}>
            {/* Breadcrumbs */}
            {/* <DocumentBreadcrumbs /> */}

            {/* Image */}
            <Box
              sx={{
                position: "relative",
                height: "100%",
                width: "100%",
                mb: 3,
              }}
            >
              <img
                loading="lazy"
                src={thumbnail}
                alt={title}
                onError={(e) => {
                  e.target.src = DEFAULT_CONTENT_THUMBNAIL;
                  return true;
                }}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "24px",
                  maxHeight: "300px",
                  boxShadow: theme.palette.boxShadows.shadow6,
                }}
              />

              <AuthorInBanner author={author} brand={metadata?.brand} />

              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  bgcolor: "#333333",
                  color: "white",
                  borderRadius: "6px",
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  px: 1,
                  py: 0.7,
                }}
              >
                <Typography variant="caption">{t(category)}</Typography>
              </Stack>
            </Box>

            {/* Title */}
            <Title variant={{ xs: "h3", md: "h2" }} id={createSlug(title)}>
              {title}
            </Title>

            {/* Description */}
            <Typography>{description}</Typography>

            {/* Details */}
            {!previewMode && <DocMetadata {...document} />}

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
        </Container>
      </Stack>
    </Box>
  );
};

export default ContentDocument;
