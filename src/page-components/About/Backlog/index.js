import BacklogForm from "@components/forms/BacklogForm";
import Title from "@components/Title";
import { useAppSelector } from "@hooks/useRedux";
import { submitBacklog } from "@lib/backlog";
import AddIcon from "@mui/icons-material/Add";
import { Box, Dialog, Drawer, Fab, Tooltip } from "@mui/material";
import { cleanObject } from "@utils/helpers";
import { useSnackbar } from "notistack";
import { useState } from "react";
import Board from "./Board";

const AboutBacklog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { profile } = useAppSelector((state) => state.profile);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleBacklogSubmit = async (data) => {
    const _key = enqueueSnackbar("Creating Ticket...", {
      variant: "default",
    });

    try {
      const res = await submitBacklog(profile?.id, cleanObject(data));

      closeSnackbar(_key);
      enqueueSnackbar("Success", {
        variant: "success",
        autoHideDuration: 2000,
        onClose: () => {
          setDialogOpen(false);
          //   Router.push("/app/studio");
        },
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error", {
        variant: "error",
        autoHideDuration: 2000,
        onClose: () => {
          setDialogOpen(false);
          //   Router.push("/app/studio");
        },
      });
    }
  };

  return (
    <Box>
      {/* Mission */}
      <Title variant={{ xs: "h4", md: "h3" }} sx={{ mb: 2 }}>
        Backlog
      </Title>

      <Board />

      <Tooltip title="Create ticket">
        <Fab
          color="primary"
          size="medium"
          onClick={() => setDialogOpen(true)}
          sx={{ position: "fixed", right: 20, bottom: 20, zIndex: 9999 }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <Box sx={{ p: 4 }}>
          <BacklogForm handleSubmit={handleBacklogSubmit} />
        </Box>
      </Dialog>
    </Box>
  );
};

export default AboutBacklog;
