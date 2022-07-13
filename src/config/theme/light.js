import { grey } from "@mui/material/colors";
import typography from "./typography";
import breakpoints from "./breakpoints";

export const lightTheme = {
  palette: {
    mode: "light",
    primary: {
      main: "#1ABC9C",
      grey1: grey[100],
      grey2: grey[200],
    },
    text: {
      primary: "#425466",
      title: "#333333",
    },
    background: {
      default: "#F6FAF9",
      gradient1:
        "linear-gradient(335deg, rgba(245,252,239,1) 13%, rgba(250,255,247,1) 38%, rgba(255,255,255,1) 100%)",
    },
  },
  typography,
  breakpoints,
};
