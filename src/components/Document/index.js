import ScrollSpy from "@components/ScrollSpy";
import Title from "@components/Title";
import { BRANDS, CONTENT_CARD_BRAND_STYLES } from "@constants/index";
import useDocRead from "@hooks/useDocRead";
import { useAppSelector } from "@hooks/useRedux";
import { listenOneContent } from "@lib/content";
import { updateUserReadDocument } from "@lib/document";
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
import {
  addChapters,
  createSlug,
  createTitle,
  extractHeadingsFromMd,
  getLevel,
  parseDepths,
} from "@utils/markdown";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MarkdownBody from "./MarkdownBody";

export const AuthorInBanner = ({ author, brand }) => {
  const theme = useTheme();
  const [name, setName] = useState(brand);

  useEffect(() => {
    if (!brand && author) {
      getContact(author).then((res) => {
        setName(`${res.firstName || ""} ${res.lastName || ""}`);
      });
    }
  }, []);

  return (
    <Link passHref href={`/u/${author}`} target="_blank">
      <Box
        sx={{
          cursor: "pointer",
          position: "absolute",
          right: "20px",
          bottom: "20px",
          bgcolor: "white",
          borderRadius: "24px",
          px: 2,
          py: 1.5,
          "&:hover": {
            boxShadow: theme.palette.boxShadows.shadow1,
          },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar
            src={CONTENT_CARD_BRAND_STYLES[brand]}
            sx={{ height: "40px", width: "40px" }}
          />

          <Stack>
            <Typography
              variant="body2"
              sx={{ fontWeight: 300, color: grey[500] }}
            >
              Author
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {name}
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
    category,
    updatedTimestamp,
    contributors,
    level,
    views,
    metadata,
    author,
    thumbnail = "https://thumbs.dreamstime.com/b/bitcoin-banner-golden-digital-currency-cryptocurrency-futuristic-money-technology-worldwide-network-concept-vector-206771631.jpg",
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

  const liked = !!profile?.likedContent?.includes?.(id);

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
    <Box>
      <Stack direction="row" spacing={5}>
        {!hideScrollspy && (
          <Hidden smDown>
            {/* Left side scrollspy */}
            {ids?.length > 0 && (
              <Box sx={{ py: 5 }}>
                {/* <BackButton sx={{ mb: { xs: 1, md: 2 } }} /> */}
                <ScrollSpy title="Table of Content" data={ids} />
              </Box>
            )}
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
                minHeight: 260,
                width: "100%",
                mb: 3,
              }}
            >
              <img
                src={thumbnail}
                alt={title}
                onError={(e) => {
                  e.target.src =
                    "https://thumbs.dreamstime.com/b/bitcoin-banner-golden-digital-currency-cryptocurrency-futuristic-money-technology-worldwide-network-concept-vector-206771631.jpg";
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
            <Title variant={{ xs: "h3", md: "h2" }}>{title}</Title>

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
