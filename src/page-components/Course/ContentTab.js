import {
  Box,
  Collapse,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import BookmarkIcon from "@mui/icons-material/BookmarkBorder";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";

const Content = ({ course }) => {
  const { carriculum = {} } = course;
  const [open, setOpen] = useState(0);

  return (
    <List>
      {Object.values(carriculum).map((section, i) => {
        const documents = Object.values(section?.documents || {});

        return (
          <React.Fragment key={i}>
            <ListItemButton
              onClick={() => (open === i ? setOpen(null) : setOpen(i))}
              sx={{
                bgcolor: "background.paper",
                borderRadius: "8px",
                mb: 1,
                boxShadow: "0px 2px 10px rgba(24, 39, 75, 0.05)",
              }}
            >
              {/* <ListItemIcon sx={{ minWidth: 20, mr: 1 }}>
                <BookmarkIcon fontSize="small" sx={{ color: "primary.main" }} />
              </ListItemIcon> */}
              <ListItemText primary={section.title} />
              {open === i ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open == i} timeout="auto" unmountOnExit>
              <Box sx={{ px: 1 }}>
                <Typography variant="body2">{section.description}</Typography>

                <List component="div" disablePadding>
                  {documents.map((_doc, i) => (
                    <ListItem
                      key={i}
                      sx={{ pl: 4, mb: i === documents?.length - 1 ? 2 : 0 }}
                    >
                      <ListItemIcon sx={{ minWidth: 20, mr: 1 }}>
                        {_doc.contentType === "document" ? (
                          <BookmarkIcon
                            fontSize="small"
                            sx={{ color: "primary.main" }}
                          />
                        ) : (
                          <AssessmentOutlinedIcon
                            fontSize="small"
                            sx={{ color: "primary.main" }}
                          />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={_doc.title}
                        primaryTypographyProps={{ typography: "body2" }}
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="caption">
                          {_doc.duration} minutes
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Collapse>
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default Content;
