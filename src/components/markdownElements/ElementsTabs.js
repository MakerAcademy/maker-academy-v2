import {
  Box,
  Button,
  ClickAwayListener,
  Paper,
  Popover,
  Popper,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
];

const ElementsTabs = () => {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const selectedItem = anchorEl?.item;

  const handleClick = (event, item) => {
    setAnchorEl({ target: event.currentTarget, item });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = () => {};

  return (
    <Box>
      <Typography sx={{ mb: 1, textAlign: "center" }}>Elements</Typography>

      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={0}
        TabIndicatorProps={{ style: { display: "none" } }}
        sx={{
          height: 450,
          [theme.breakpoints.up("xl")]: {
            height: 600,
          },
        }}
      >
        {ELEMENTS.map((item, i) => {
          return (
            <Tab
              label={item.label}
              key={i}
              onClick={(e) => handleClick(e, item)}
            />
          );
        })}
      </Tabs>

      {!!anchorEl && (
        <ClickAwayListener onClickAway={handleClose}>
          <Popper
            open={!!anchorEl}
            anchorEl={anchorEl?.target}
            placement={"left-start"}
          >
            <Paper sx={{ p: 2 }}>
              <Stack spacing={1}>
                <Typography>{selectedItem.label}</Typography>

                <img
                  src={selectedItem?.image}
                  alt={selectedItem?.label}
                  style={{
                    maxHeight: 200,
                    maxWidth: 200,
                    objectFit: "contain",
                  }}
                />

                <CopyToClipboard text={selectedItem?.value}>
                  <Button onClick={handleClose} size="small">
                    Copy
                  </Button>
                </CopyToClipboard>
              </Stack>
            </Paper>
          </Popper>
        </ClickAwayListener>
      )}
    </Box>
  );
};

export default ElementsTabs;
