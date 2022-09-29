import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import BookmarkIcon from "@mui/icons-material/BookmarkBorder";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { useRouter } from "next/router";
import { useAppSelector } from "@hooks/useRedux";
import Link from "next/link";

export const buildCourseNavLink = (courseId, docId, contentType) => {
  return `/course/${courseId}/${
    contentType === "assessment" ? "assessment" : "learn"
  }/${docId}`;
};

export const getNextPreviousFromCourse = (course, docId) => {
  const _allDocs = course?.carriculum?.flatMap?.((n) => n.documents);
  const _currentIdx = _allDocs?.findIndex?.((el) => el.docId === docId);

  const _next = _allDocs[_currentIdx + 1];
  const _previous = _allDocs[_currentIdx - 1];

  return { _next, _previous, _currentIdx, _allDocs };
};

const NextPreviousButton = ({ Icon, href, tooltip }) => {
  const MyComponent = href ? Link : React.Fragment;

  const _props = {
    ...(href ? { href, passHref: true } : {}),
  };

  return (
    <MyComponent {..._props}>
      <Tooltip title={tooltip}>
        <IconButton size="small" disabled={!href}>
          <Icon fontSize="small" />
        </IconButton>
      </Tooltip>
    </MyComponent>
  );
};

const CourseBreadrumbsNav = ({ course, _document, type }) => {
  const {
    query: { docId, courseId },
  } = useRouter();
  const { profile } = useAppSelector((state) => state.profile);

  const courseTitle = course?.metadata?.title;
  const documentTitle = _document?.metadata?.title;
  const isRead =
    type === "assessment"
      ? !!profile?.submittedAssessments?.includes(docId)
      : profile?.readDocuments?.includes(docId);

  const { _next, _previous, _currentIdx, _allDocs } = getNextPreviousFromCourse(
    course,
    docId
  );

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ bgcolor: "background.paper", borderRadius: "8px", py: 1.5, px: 2 }}
    >
      {/* Left Side */}
      <Stack direction="row" alignItems="center">
        {isRead ? (
          <BookmarkAddedIcon sx={{ mr: 1 }} />
        ) : (
          <BookmarkIcon sx={{ mr: 1 }} />
        )}
        <Typography variant="body2">
          {`${courseTitle} > ${documentTitle}`}
        </Typography>
      </Stack>

      {/* Right Side */}
      <Stack direction="row" alignItems="center">
        <Typography variant="body2" sx={{ mr: 1 }}>
          {_currentIdx + 1}&nbsp;{"of"}&nbsp;
          {_allDocs?.length || 0}
        </Typography>

        <NextPreviousButton
          tooltip={"Previous Article"}
          Icon={KeyboardArrowLeftIcon}
          href={
            _previous
              ? buildCourseNavLink(
                  courseId,
                  _previous.docId,
                  _previous.contentType
                )
              : null
          }
        />

        <NextPreviousButton
          tooltip={"Next Article"}
          Icon={KeyboardArrowRightIcon}
          href={
            _next
              ? buildCourseNavLink(courseId, _next.docId, _next.contentType)
              : null
          }
        />
      </Stack>
    </Stack>
  );
};

export default CourseBreadrumbsNav;
