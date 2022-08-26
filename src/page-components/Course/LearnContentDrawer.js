import { NAVBAR_HEIGHT_DESKTOP } from "@constants/";
import { useAppSelector } from "@hooks/useRedux";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Collapse,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import useScrollPosition from "@hooks/useScrollPosition";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const DRAWER_WIDTH = 280;

const LearnContentDrawer = ({ course }) => {
  const { profile } = useAppSelector((state) => state.profile);
  const { title, carriculum = {} } = course;
  const theme = useTheme();
  const scrollPosition = useScrollPosition();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const { query } = useRouter();

  const docIdx = Object.values(carriculum).findIndex((item) => {
    return Object.values(item.documents)?.find((j) => j.docId === query.docId);
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [open, setOpen] = useState(docIdx);

  // useEffect(() => {
  //   if (isDesktop) {
  //     handleOpen();
  //   }
  // }, [isDesktop]);

  const handleOpen = () => {
    setDrawerOpen(true);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  const Content = () => (
    <Box
      sx={{
        px: 2,
        py: 2,
        [theme.breakpoints.up("md")]: {
          marginTop:
            scrollPosition > 0
              ? `${
                  scrollPosition > NAVBAR_HEIGHT_DESKTOP
                    ? 0
                    : NAVBAR_HEIGHT_DESKTOP - scrollPosition
                }px`
              : `${NAVBAR_HEIGHT_DESKTOP}px`,
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1 }}
      >
        <Typography>Content</Typography>

        <IconButton onClick={handleClose}>
          <MenuOpenIcon />
        </IconButton>
      </Stack>
      <List>
        {Object.values(carriculum).map((section, i) => {
          return (
            <React.Fragment key={i}>
              <ListItemButton
                onClick={() => (open === i ? setOpen(null) : setOpen(i))}
                sx={{
                  bgcolor: "primary.grey1",
                  borderRadius: "8px",
                  mb: 1,
                  boxShadow: "0px 2px 10px rgba(24, 39, 75, 0.02)",
                }}
              >
                <ListItemText
                  primary={section.title}
                  primaryTypographyProps={{
                    typography: "body2",
                  }}
                />
                {open === i ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse in={open == i} timeout="auto" unmountOnExit>
                <Box>
                  <List component="div" disablePadding>
                    {Object.values(section?.documents || {}).map((_doc, i) => (
                      <ListItemButton
                        selected={query.docId === _doc.docId}
                        key={i}
                        href={`/course/${query.courseId}/${
                          _doc.contentType === "assessment"
                            ? "assessment"
                            : "learn"
                        }/${_doc.docId}`}
                        sx={{
                          mb:
                            i + 1 ===
                            Object.values(section?.documents || {})?.length
                              ? 2
                              : 0,
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 20, mr: 0.6 }}>
                          <BookmarkIcon
                            fontSize="small"
                            sx={{
                              color: profile?.readDocuments?.includes(
                                _doc.docId
                              )
                                ? "primary.main"
                                : "primary.grey4",
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={_doc.title}
                          primaryTypographyProps={{
                            typography: "caption",
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Box>
              </Collapse>
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {!drawerOpen && (
        <Tooltip title="Open course content">
          <Button
            onClick={handleOpen}
            disableElevation
            sx={{
              bgcolor: "primary.grey2",
              height: 100,
              position: "fixed",
              top: 140,
              minWidth: 30,
            }}
          >
            <KeyboardArrowRightIcon />
          </Button>
        </Tooltip>
      )}

      <Hidden mdDown>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleClose}
          variant={isDesktop ? "persistent" : "temporary"}
          PaperProps={{
            elevation: 0,
            sx: {
              width: DRAWER_WIDTH,
            },
          }}
        >
          <Content />
        </Drawer>
      </Hidden>

      <Hidden mdUp>
        {drawerOpen && (
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={handleClose}
            variant={"permanent"}
            PaperProps={{
              elevation: 0,
              sx: {
                width: DRAWER_WIDTH,
              },
            }}
          >
            <Content />
          </Drawer>
        )}
      </Hidden>
    </>
  );
};

export default LearnContentDrawer;
