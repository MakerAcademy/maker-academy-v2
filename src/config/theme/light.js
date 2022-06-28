import { grey } from "@mui/material/colors";
import typography from "./typography";

export const lightTheme = {
  palette: {
    mode: "light",
    primary: {
      main: "#1ABC9C",
      grey1: grey[100],
    },
    text: {
      primary: "#425466",
      title: "#333333",
    },
    background: { default: "#F6FAF9" },
  },
  typography,
};
