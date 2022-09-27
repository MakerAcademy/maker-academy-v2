import Title from "@components/Title";
import { useAppSelector } from "@hooks/useRedux";
import { listenStatusUpdates, submitStatusUpdate } from "@lib/statusUpdate";
import { Box, Button, Dialog, Stack } from "@mui/material";
import { cleanObject } from "@utils/helpers";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import StatusUpdateItem from "./Item";

const StatusUpdatesForm = dynamic(() => import("@forms/StatusUpdatesForm"), {
  ssr: false,
});

const AboutStatusUpdates = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [data, setData] = useState([]);

  const { profile } = useAppSelector((state) => state.profile);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    const unsub = listenStatusUpdates(setData);
    return () => unsub();
  }, []);

  const handleStatusSubmit = async (data) => {
    const _key = enqueueSnackbar("Creating Ticket...", {
      variant: "default",
    });

    try {
      const res = await submitStatusUpdate(profile?.id, cleanObject(data));

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
      <Stack alignItems="flex-start" spacing={2} sx={{ mb: { xs: 3, md: 5 } }}>
        <Title variant={{ xs: "h4", md: "h3" }}>Status Updates</Title>

        {user?.trustLevel > 3 && (
          <Button onClick={() => setDialogOpen(true)}>Add new update</Button>
        )}
      </Stack>

      <Stack spacing={3}>
        {data.map((item, i) => (
          <StatusUpdateItem key={i} values={item} />
        ))}
      </Stack>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <Box sx={{ p: 4 }}>
          <StatusUpdatesForm handleSubmit={handleStatusSubmit} />
        </Box>
      </Dialog>
    </Box>
  );
};

export default AboutStatusUpdates;
