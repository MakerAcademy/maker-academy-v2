import GreenButton from "@components/buttons/GreenButton";
import Title from "@components/Title";
import { acceptEditRequest, declineEditRequest } from "@lib/editrequests";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const EditRequestCard = (props) => {
  const { thumbnail, contentType, id, title, shortDescription } = props;

  const theme = useTheme();
  const [showOpenBtn, setShowOpenBtn] = useState(false);

  const showButton = (e) => {
    e.preventDefault();
    setShowOpenBtn(true);
  };

  const hideButton = (e) => {
    e.preventDefault();
    setShowOpenBtn(false);
  };

  const handleAccept = async () => {
    acceptEditRequest(props);
  };

  const handleDecline = async () => {
    declineEditRequest(id);
  };

  return (
    <Card>
      <Box
        sx={{ mb: 1.5, position: "relative", cursor: "pointer" }}
        onMouseEnter={(e) => showButton(e)}
        onMouseLeave={(e) => hideButton(e)}
      >
        <img
          src={thumbnail}
          alt={title}
          style={{
            height: "100%",
            width: "100%",
            maxHeight: 150,
            objectFit: "cover",
            filter: showOpenBtn && "brightness(0.5)",
          }}
        />

        {showOpenBtn && (
          <Box
            sx={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, 0%)",
            }}
          >
            <OpenInNewIcon sx={{ color: theme.palette.common.white }} />
          </Box>
        )}
      </Box>

      <CardContent>
        <Stack spacing={2}>
          <Title variant="h6">{title}</Title>

          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              lineClamp: 2,
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {shortDescription}
          </Typography>

          <Stack direction="row" spacing={2}>
            <GreenButton
              variant="outlined"
              size="small"
              fullWidth
              onClick={handleDecline}
            >
              Decline
            </GreenButton>

            <GreenButton size="small" fullWidth onClick={handleAccept}>
              Accept
            </GreenButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default EditRequestCard;
