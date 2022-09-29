import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  buildCourseNavLink,
  getNextPreviousFromCourse,
} from "./CourseBreadrumbsNav";

const CustomButton = ({ href, children }) => {
  const MyComponent = href ? Link : React.Fragment;

  const _props = {
    ...(href ? { href, passHref: true } : {}),
  };

  return (
    <MyComponent {..._props}>
      <Button size="small" disabled={!href}>
        {children}
      </Button>
    </MyComponent>
  );
};

const NextPreviousButtons = ({ course }) => {
  const {
    query: { docId, courseId },
  } = useRouter();

  const { _next, _previous } = getNextPreviousFromCourse(course, docId);

  //   console.log(buildCourseNavLink(courseId, _next.docId, _next.contentType));

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", mt: 3 }}
      spacing={3}
    >
      <CustomButton
        href={
          _previous
            ? buildCourseNavLink(
                courseId,
                _previous.docId,
                _previous.contentType
              )
            : null
        }
      >
        Previous Article
      </CustomButton>

      <CustomButton
        href={
          _next
            ? buildCourseNavLink(courseId, _next.docId, _next.contentType)
            : null
        }
      >
        Next Article
      </CustomButton>
    </Stack>
  );
};

export default NextPreviousButtons;
