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
  IconButton,
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MarkdownBody from "@components/Document/MarkdownBody";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useSnackbar } from "notistack";
import { cleanObject } from "@utils/helpers";
import dynamic from "next/dynamic";

const BacklogForm = dynamic(() => import("@forms/BacklogForm"), {
  ssr: false,
});

const ISSUE_TYPE_NUMBER = {
  bug_fix: "bug",
  improvement: "improvement",
  feature: "feature",
};

const Element = (props) => {
  const {
    values: { title, description, thumbnail, id, status, issue_type },
    index,
  } = props;
  const [isHover, setIsHover] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const { t } = useTranslation("about");
  const theme = useTheme();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleStatusChange = (e, v) => {
    const _value = e.target.value;

    updateBacklog(id, { status: _value || "open" });
  };

  const handleDelete = () => {
    setViewDialogOpen(false);
    setEditDialogOpen(false);
    deleteBacklog(id);
  };

  const handleBacklogSubmit = async (data) => {
    const _key = enqueueSnackbar("Creating Ticket...", {
      variant: "default",
    });

    try {
      const res = await updateBacklog(id, cleanObject(data));

      closeSnackbar(_key);
      enqueueSnackbar("Success", {
        variant: "success",
        autoHideDuration: 2000,
        onClose: () => {
          setEditDialogOpen(false);
          //   Router.push("/app/studio");
        },
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error", {
        variant: "error",
        autoHideDuration: 2000,
        onClose: () => {
          setEditDialogOpen(false);
          //   Router.push("/app/studio");
        },
      });
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{ bgcolor: "grey.grey3", borderRadius: 3 }}
        onMouseEnter={(e) => setIsHover(true)}
        onMouseLeave={(e) => setIsHover(false)}
      >
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 3,
            cursor: "pointer",
            boxShadow: "0px 2px 10px rgba(24, 39, 75, 0.15)",
          }}
          onClick={() => setViewDialogOpen(true)}
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
      </Box>

      {isHover && (
        <Stack
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
          }}
          onMouseEnter={(e) => setIsHover(true)}
          onMouseLeave={(e) => setIsHover(false)}
        >
          <IconButton
            size="small"
            color="primary"
            onClick={() => setEditDialogOpen(true)}
          >
            <EditIcon sx={{ fontSize: 18 }} />
          </IconButton>

          <IconButton size="small" onClick={handleDelete} color="error">
            <DeleteIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>
      )}

      {/* View Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <Stack sx={{ p: 4 }} spacing={3}>
          <Title>{title}</Title>

          {thumbnail && (
            <Box sx={{ maxHeight: 250 }}>
              <ImageGallery
                items={[{ thumbnail, original: thumbnail }]}
                disableSwipe
                disableThumbnailScroll
                showThumbnails={false}
                showPlayButton={false}
              />
            </Box>
          )}

          <MarkdownBody markdown={description} />

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
            </Stack>
          )}
        </Stack>
      </Dialog>

      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <Box sx={{ p: 4 }}>
          <BacklogForm
            edit
            values={props.values}
            handleSubmit={handleBacklogSubmit}
          />
        </Box>
      </Dialog>
    </Box>
  );
};

export default Element;
