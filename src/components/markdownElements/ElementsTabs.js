import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Box,
  ClickAwayListener,
  Paper,
  Popper,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ELEMENTS from "./elements";

const ElementsTabs = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const theme = useTheme();
  const [copied, setCopied] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const selectedItem = anchorEl?.item;

  const handleEnter = (event, item) => {
    setAnchorEl({ target: event.currentTarget, item });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (copied) {
      enqueueSnackbar("Copied", {
        variant: "success",
        autoHideDuration: 800,
        onClose: () => setCopied(false),
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }
  }, [copied]);

  return (
    <Box>
      <Typography sx={{ mb: 1 }}>Markdown</Typography>

      <Tabs
        variant="scrollable"
        value={0}
        TabIndicatorProps={{ style: { display: "none" } }}
        sx={{
          "& .Mui-selected": {
            color: "text.primary",
          },
        }}
      >
        {ELEMENTS.map((item, i) => {
          return (
            <Tab
              label={
                <React.Fragment>
                  <CopyToClipboard
                    text={item?.value}
                    onCopy={() => setCopied(true)}
                  >
                    <Stack spacing={1}>
                      <img
                        src={item?.image}
                        alt={item?.label}
                        style={{
                          maxHeight: 100,
                          maxWidth: 100,
                          objectFit: "contain",
                        }}
                        onMouseEnter={(e) => handleEnter(e, item)}
                        onMouseLeave={handleClose}
                      />

                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography variant="body2">{item.label}</Typography>

                        <Tooltip title="copy_to_clipboard">
                          <ContentCopyIcon sx={{ fontSize: 16 }} />
                        </Tooltip>
                      </Stack>
                    </Stack>
                  </CopyToClipboard>
                </React.Fragment>
              }
              key={i}
            />
          );
        })}
      </Tabs>

      {!!anchorEl && (
        <ClickAwayListener onClickAway={handleClose}>
          <Popper
            open={!!anchorEl}
            anchorEl={anchorEl?.target}
            placement={"auto"}
            sx={{ zIndex: 999 }}
          >
            <Paper sx={{ p: 2 }}>
              <img
                src={selectedItem?.image}
                alt={selectedItem?.label}
                style={{
                  maxHeight: 300,
                  maxWidth: 300,
                  objectFit: "contain",
                }}
              />
            </Paper>
          </Popper>
        </ClickAwayListener>
      )}
    </Box>
  );
};

export default ElementsTabs;
