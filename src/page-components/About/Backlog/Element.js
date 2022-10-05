import MarkdownBody from "@components/Document/MarkdownBody";
import Title from "@components/Title";
import { useAppSelector } from "@hooks/useRedux";
import { deleteBacklog, updateBacklog } from "@lib/backlog";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReviewsIcon from "@mui/icons-material/Reviews";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import {
  Box,
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
import { cleanObject } from "@utils/helpers";
import hex from "@utils/hexTransparency";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";
import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ISSUE_TYPE_COLOR } from "./Column";

const BacklogForm = dynamic(() => import("@forms/BacklogForm"), {
  ssr: false,
});

const ISSUE_TYPE_NUMBER = {
  bug_fix: "bug",
  improvement: "improvement",
  feature: "feature",
};

export const ISSUE_STATUS = (theme, type) => {
  const _type = {
    open: { color: theme.palette.info.main, Icon: TipsAndUpdatesIcon },
    development: { color: theme.palette.warning.light, Icon: AutoAwesomeIcon },
    review: { color: theme.palette.secondary.light, Icon: ReviewsIcon },
    done: { color: theme.palette.primary.main, Icon: CheckCircleIcon },
  };

  return _type[type];
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

  const statusColor = ISSUE_STATUS(theme, status).color;
  const StatusIcon = ISSUE_STATUS(theme, status).Icon;

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
                bgcolor: `${ISSUE_TYPE_COLOR(theme, issue_type)}${hex["5%"]}`,
                color: `${ISSUE_TYPE_COLOR(theme, issue_type)}`,
                border: `1px solid ${ISSUE_TYPE_COLOR(theme, issue_type)}`,
                fontSize: 14,
              }}
            />

            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="caption" sx={{ color: statusColor }}>
                {t(status)}
              </Typography>

              <StatusIcon sx={{ color: statusColor, fontSize: 18 }} />
            </Stack>
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
