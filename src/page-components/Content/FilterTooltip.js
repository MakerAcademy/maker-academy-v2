import Close from "@mui/icons-material/Close";
import {
  Backdrop,
  Box,
  Button,
  IconButton,
  Paper,
  Popper,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import useSWR, { mutate } from "swr";

const FilterTooltip = ({ openFilterBtnRef }) => {
  const theme = useTheme();

  const { data } = useSWR("filterTooltipDisplayed", (key) => {
    const value = localStorage.getItem(key);
    return value;
  });

  const handleClick = () => {
    localStorage.setItem("filterTooltipDisplayed", true);
    mutate("filterTooltipDisplayed", true);
  };

  const open = data === null;

  const top = openFilterBtnRef?.current?.offsetTop;
  const left = openFilterBtnRef?.current?.offsetLeft;

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "visible";
  }, [open]);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 2 }}
      open={open}
      onClick={handleClick}
    >
      <Paper
        sx={{
          py: 0.8,
          px: 1,
          position: "absolute",
          top: top + 40,
          left: left - 70,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" sx={{ maxWidth: 160 }}>
          Use this filter button to search and set filters!
        </Typography>

        <IconButton size="small" onClick={handleClick} sx={{ ml: 0.5 }}>
          <Close fontSize="small" />
        </IconButton>
      </Paper>
    </Backdrop>
  );
};

export default FilterTooltip;
