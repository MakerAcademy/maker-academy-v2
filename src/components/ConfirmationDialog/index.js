import Title from "@components/Title";
import { Button, Dialog, Stack, Typography, useTheme } from "@mui/material";
import hex from "@utils/hexTransparency";

const ConfirmationDialog = ({
  title = "Confirmation",
  description = "Are you sure to do this?",
  acceptText = "Accept",
  rejectText = "Cancel",
  open,
  handleAccept,
  handleReject,
  rejectColor = "inherit",
  acceptColor = "primary",
}) => {
  const theme = useTheme();

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={!!open}
      onClose={handleReject}
      // disableEscapeKeyDown={true}

      BackdropProps={{
        sx: {
          backgroundColor: `${theme.palette.background.default}${hex["80%"]}`,
        },
      }}
      PaperProps={{
        sx: { px: 4, py: 3, borderRadius: "12px" },
      }}
    >
      <Stack
        sx={{ height: "100%", width: "100%" }}
        // alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Title variant={{ xs: "h6", md: "h5" }}>{title}</Title>

        <Typography>{description}</Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={2}
          sx={{ pt: 2 }}
        >
          <Button
            variant="outlined"
            size="small"
            color={rejectColor}
            onClick={handleReject}
          >
            {rejectText}
          </Button>

          <Button
            variant="contained"
            size="small"
            color={acceptColor}
            onClick={handleAccept}
            sx={{ color: "white" }}
          >
            {acceptText}
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default ConfirmationDialog;
