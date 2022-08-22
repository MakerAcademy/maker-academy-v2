import {
  Box,
  Button,
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
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useSnackbar } from "notistack";

const ELEMENTS = [
  {
    label: "collapse",
    value:
      "$$\ncomponent: collapse\ntitle: What is DAI?\ntext: Hello this works\nNew line here\nvariant: p\n$$",
    image:
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png",
  },
  {
    label: "hero_1",
    value:
      "$$\ncomponent: hero\nimage: https://static.gopro.com/assets/blta2b8522e5372af40/blt563ee3c5cea69e67/611bd591cf33c613b2c06df6/pdp-subscription-hero-image-1440-2x.jpg\nheight: 220\ninvertColor: true\nbody: {{\n### Header Text here\n**Line 1 bold**\nLine 1 normal\n}}\n$$",
    image:
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png",
  },
  {
    label: "quote",
    value:
      "$$\ncomponent: quote\ntext: Twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do.\nauthor: Albert Einstein\n$$",
    image:
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png",
  },
  {
    label: "box",
    value:
      "$$\ncomponent: box\nbody: {{\n### Header Text here\n**Line 1 bold**\nLine 1 normal\n}}\n$$",
    image:
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png",
  },
  {
    label: "cta_box",
    value:
      "$$\ncomponent: cta_box\ntitle: MakerDao History\ndescription: Start here if you’re new to MakerDAO and the Academy.\nbuttonText: Learn More\nbuttonLink: #\n$$",
    image:
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png",
  },
  {
    label: "vote_results",
    value:
      "$$\ncomponent: vote_results\ntitle: Maker Vote\ndirection: horizontal\nlabels: [For, Against]\ndata: [1408, 643]\nshowLegend: true\n$$",
    image:
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png",
  },
  {
    label: "code",
    value:
      '$$\ncomponent: code\nlanguage: javascript\ncode: {{\nconsole.log("Hello World!")\n}}\n$$',
    image:
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png",
  },
];

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
