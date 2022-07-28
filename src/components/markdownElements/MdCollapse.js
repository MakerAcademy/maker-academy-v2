import { Card, Collapse, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { parseMdCode } from ".";
import { parseLineBreaks } from "@utils/helperFunctions";

const MdCollapse = ({ value }) => {
  const data = parseMdCode(value);
  const { title, text } = data || {};

  const [open, setOpen] = useState(!!data.open);

  const _text = parseLineBreaks(text);

  const triggerCollapse = () => {
    setOpen(!open);
  };

  return (
    <Card sx={{ p: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography>{title}</Typography>
        <IconButton size="small" onClick={triggerCollapse}>
          {open ? (
            <RemoveIcon fontSize="small" />
          ) : (
            <AddIcon fontSize="small" />
          )}
        </IconButton>
      </Stack>

      <Collapse in={open}>
        <Typography variant="body2" sx={{ pt: 3 }}>
          {_text}
        </Typography>
      </Collapse>
    </Card>
  );
};

export default MdCollapse;
