import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Card, Collapse, IconButton, Stack, Typography } from "@mui/material";
import { parseLineBreaks } from "@utils/helperFunctions";
import { useState } from "react";

const MdCollapse = ({ data }) => {
  const { title, text, defaultOpen } = data || {};

  const [open, setOpen] = useState(!!defaultOpen);

  const _text = parseLineBreaks(text);

  const triggerCollapse = () => {
    setOpen(!open);
  };

  return (
    <Card sx={{ p: 2, borderRadius: "16px" }} elevation={0}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography>{title}</Typography>
        <IconButton
          size="small"
          onClick={triggerCollapse}
          sx={{ bgcolor: "primary.grey1" }}
        >
          {open ? (
            <RemoveIcon sx={{ fontSize: 16 }} />
          ) : (
            <AddIcon sx={{ fontSize: 16 }} />
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
