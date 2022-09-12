import Title from "@components/Title";
import { BACKLOG_TYPES } from "@constants/";
import { useAppSelector } from "@hooks/useRedux";
import { deleteBacklog, updateBacklog } from "@lib/backlog";
import {
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

const ISSUE_TYPE_NUMBER = {
  bug_fix: "bug",
  improvement: "improvement",
  feature: "feature",
};

const Element = ({ title, description, id, index, status, issue_type }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const { t } = useTranslation("about");
  const theme = useTheme();

  const handleStatusChange = (e, v) => {
    const _value = e.target.value;

    updateBacklog(id, { status: _value || "open" });
  };

  const handleDelete = () => {
    setDialogOpen(false);
    deleteBacklog(id);
  };

  return (
    <Box sx={{ bgcolor: "grey.grey3", borderRadius: 3 }}>
      <Draggable draggableId={id} index={index} isDragDisabled>
        {(provided, snapshot) => (
          <Paper
            elevation={0}
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{
              p: 2,
              borderRadius: 3,
              cursor: "pointer",
              boxShadow: "0px 2px 10px rgba(24, 39, 75, 0.15)",
            }}
            onClick={() => setDialogOpen(true)}
          >
            <Typography sx={{ mb: 2 }} variant="body2">
              <Typography
                component="span"
                variant="body2"
                sx={{ fontWeight: 600, mr: 0.5 }}
              >
                {t(ISSUE_TYPE_NUMBER[issue_type])} {index + 1}:
              </Typography>
              {title}
            </Typography>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Chip
                label={t(issue_type)}
                size="small"
                sx={{
                  border: `2px solid ${theme.palette.primary.main}`,
                  fontSize: 14,
                }}
              />

              <Typography variant="caption">{t(status)}</Typography>
            </Stack>
          </Paper>
        )}
      </Draggable>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <Stack sx={{ p: 4 }} spacing={3}>
          <Title>{title}</Title>

          <Typography>{description}</Typography>

          {user?.trustLevel > 3 && (
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <FormControl size="small" sx={{ minWidth: 170 }}>
                <InputLabel>{t("status")}</InputLabel>
                <Select
                  value={status}
                  label={t("status")}
                  onChange={handleStatusChange}
                >
                  <MenuItem value={"open"}>{t("open")}</MenuItem>
                  <MenuItem value={"development"}>{t("development")}</MenuItem>
                  <MenuItem value={"review"}>{t("review")}</MenuItem>
                  <MenuItem value={"done"}>{t("done")}</MenuItem>
                </Select>
              </FormControl>

              <Button color="error" variant="outlined" onClick={handleDelete}>
                {t("delete")}
              </Button>
            </Stack>
          )}
        </Stack>
      </Dialog>
    </Box>
  );
};

export default Element;
