import {
  Box,
  Collapse,
  Container,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const Content = ({ course }) => {
  const { carriculum = {} } = course;
  const [open, setOpen] = useState(null);

  return (
    <List>
      {Object.values(carriculum).map((section, i) => {
        return (
          <React.Fragment key={i}>
            <ListItemButton
              onClick={() => (open === i ? setOpen(null) : setOpen(i))}
              sx={{
                bgcolor: "background.paper",
                borderRadius: "8px",
                mb: 2,
                boxShadow: "0px 2px 10px rgba(24, 39, 75, 0.05)",
              }}
            >
              <ListItemIcon sx={{ minWidth: 20, mr: 1 }}>
                <BookmarkIcon fontSize="small" sx={{ color: "primary.main" }} />
              </ListItemIcon>
              <ListItemText primary={section.title} />
              {open === i ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open == i} timeout="auto" unmountOnExit>
              <Container>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {section.description}
                </Typography>

                <List component="div" disablePadding>
                  {Object.values(section?.documents || {}).map((_doc, i) => (
                    <ListItemButton key={i} sx={{ pl: 4 }}>
                      <ListItemIcon sx={{ minWidth: 20, mr: 1 }}>
                        <BookmarkIcon
                          fontSize="small"
                          sx={{ color: "primary.main" }}
                        />
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
                    </ListItemButton>
                  ))}
                </List>
              </Container>
            </Collapse>
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default Content;
