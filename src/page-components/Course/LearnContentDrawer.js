import {
  Box,
  Button,
  Collapse,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { NAVBAR_HEIGHT_DESKTOP } from "@constants/";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useRouter } from "next/router";
import { useAppSelector } from "@hooks/useRedux";

const DRAWER_WIDTH = 280;

const LearnContentDrawer = ({ course }) => {
  const { profile } = useAppSelector((state) => state.profile);
  const { title, carriculum = {} } = course;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("xl"));

  const { query } = useRouter();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (isDesktop) {
      handleOpen();
    }
  }, [isDesktop]);

  const handleOpen = () => {
    setDrawerOpen(true);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box>
      <Button
        size="small"
        // variant="contained"
        onClick={drawerOpen ? handleClose : handleOpen}
        disableElevation
        sx={{
          mt: 13,
          mr: drawerOpen
            ? `${isDesktop ? DRAWER_WIDTH : DRAWER_WIDTH - 18}px`
            : 0,
          height: 100,
          width: 35,
          minWidth: 0,
          color: "text.primary",
          backgroundColor: "background.paper",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        {drawerOpen ? (
          <ArrowForwardIosIcon fontSize="small" />
        ) : (
          <ArrowBackIosIcon fontSize="small" />
        )}
      </Button>

      {drawerOpen && (
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleClose}
          variant={isDesktop ? "persistent" : "temporary"}
          PaperProps={{
            elevation: 0,
            sx: {
              border: "none",
              background: "background.primary",
              width: DRAWER_WIDTH,
              height: "100vh",
              position: "absolute",
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              [theme.breakpoints.up("md")]: {
                mt: 5,
                height: `calc(100vh - ${theme.spacing(
                  5
                )} - ${NAVBAR_HEIGHT_DESKTOP}px)`,
              },
            },
          }}
        >
          <Box sx={{ px: 2, py: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, px: 1 }}>
              Course Content
            </Typography>

            <Typography variant="body2" sx={{ px: 1 }}>
              {title}
            </Typography>

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
                          {Object.values(section?.documents || {}).map(
                            (_doc, i) => (
                              <ListItemButton
                                selected={query.docId === _doc.docId}
                                key={i}
                                href={`/course/${query.courseId}/learn/${_doc.docId}`}
                                sx={{
                                  mb:
                                    i + 1 ===
                                    Object.values(section?.documents || {})
                                      ?.length
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
                            )
                          )}
                        </List>
                      </Box>
                    </Collapse>
                  </React.Fragment>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default LearnContentDrawer;
