import MarkdownBody from "@components/Document/MarkdownBody";
import Title from "@components/Title";
import {
  Box,
  Dialog,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import EditIcon from "@mui/icons-material/Edit";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";
import { updateStatusUpdate } from "@lib/statusUpdate";
import { cleanObject } from "@utils/helpers";
import { useAppSelector } from "@hooks/useRedux";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const StatusUpdatesForm = dynamic(() => import("@forms/StatusUpdatesForm"), {
  ssr: false,
});

const StatusUpdateItem = ({ values }) => {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { user } = useAppSelector((state) => state.user);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { id, title, description, caption, thumbnail, video_link } = values;

  const handleStatusUpdate = async (data) => {
    const _key = enqueueSnackbar("Updating Ticket...", {
      variant: "default",
    });

    try {
      const res = await updateStatusUpdate(id, cleanObject(data));

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
    <>
      <Paper
        onClick={() => setDialogOpen(true)}
        sx={{
          cursor: "pointer",
          p: 2.5,
          borderRadius: "16px",
          boxShadow: "0px 2px 10px rgba(24, 39, 75, 0.05)",
          "&:hover": {
            boxShadow: "0px 4px 10px rgba(24, 39, 75, 0.2)",
            transform: "scale(1.01)",
          },
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ mb: 2, fontWeight: 600 }}>{title}</Typography>

          {user?.trustLevel > 3 && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setEditDialogOpen(true);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </Stack>

        <Typography color="grey.grey5">{caption}</Typography>
      </Paper>

      {/* View Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <Stack spacing={3} sx={{ p: { xs: 4, md: 6 } }}>
          <Title variant="h5">{title}</Title>

          {!video_link && (
            <img
              src={thumbnail}
              alt={title}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "contain",
                borderRadius: "24px",
                maxHeight: "600px",
                boxShadow: theme.palette.boxShadows.shadow6,
              }}
            />
          )}

          {video_link && (
            <ReactPlayer
              url={video_link}
              controls
              width={"100%"}
              height={"400px"}
            />
          )}

          <MarkdownBody markdown={description} />
        </Stack>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <Box sx={{ p: 4 }}>
          <StatusUpdatesForm
            edit
            values={values}
            handleSubmit={handleStatusUpdate}
          />
        </Box>
      </Dialog>
    </>
  );
};

export default StatusUpdateItem;
