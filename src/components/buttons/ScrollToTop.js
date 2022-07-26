import { Fab, Tooltip } from "@mui/material";
import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import hex from "@utils/hexTransparency";
import { Zoom } from "react-awesome-reveal";
import useTranslation from "next-translate/useTranslation";

const ScrollToTop = () => {
  const { t } = useTranslation("common");

  const scrollToTop = () => {
    window?.scrollTo?.({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom duration={500} style={{ position: "fixed", bottom: 24, right: 24 }}>
      <Tooltip title={t("scroll_to_top")}>
        <Fab
          onClick={scrollToTop}
          color="primary"
          sx={(theme) => ({
            backgroundColor:
              theme.palette.mode === "light"
                ? `${theme.palette.primary.main}${hex["20%"]}`
                : `${theme.palette.primary.main}${hex["30%"]}`,
            color: theme.palette.primary.main,
            boxShadow: "0px 4px 20px rgb(170 180 190 / 30%)",
            //   "& :hover": {
            //     backgroundColor: theme.palette.primary.main,
            //     color: theme.palette.text.primary,
            //   },
          })}
          size="small"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Tooltip>
    </Zoom>
  );
};

export default ScrollToTop;
