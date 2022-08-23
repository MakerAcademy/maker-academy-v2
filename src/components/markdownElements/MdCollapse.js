import MarkdownBody from "@components/Document/MarkdownBody";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Card,
  Collapse,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { parseLineBreaks } from "@utils/helperFunctions";
import { useState } from "react";

const MdCollapse = ({ data }) => {
  const theme = useTheme();
  const { title, body, defaultOpen } = data || {};

  const [open, setOpen] = useState(!!defaultOpen);

  const triggerCollapse = () => {
    setOpen(!open);
  };

  return (
    <Card sx={{ p: 2, borderRadius: "16px" }} elevation={0}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ bgcolor: "primary.grey1", p: 2 }}
      >
        <Typography>{title}</Typography>
        <IconButton
          size="small"
          onClick={triggerCollapse}
          sx={{ bgcolor: "primary.grey2" }}
        >
          {open ? (
            <RemoveIcon sx={{ fontSize: 16 }} />
          ) : (
            <AddIcon sx={{ fontSize: 16 }} />
          )}
        </IconButton>
      </Stack>

      <Collapse
        in={open}
        sx={{ border: `2px solid ${theme.palette.primary.grey1}`, p: 1.5 }}
      >
        <MarkdownBody markdown={body} headingStyle={{ mt: 0 }} />
      </Collapse>
    </Card>
  );
};

export default MdCollapse;
