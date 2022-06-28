import { grey } from "@mui/material/colors";
import typography from "./typography";

export const darkTheme = {
  palette: {
    mode: "dark",
    primary: {
      main: "#1AAB9B",
      grey1: grey[900],
    },
    text: {
      primary: "#FFF",
      title: "#FFF",
    },
    background: { default: "#1A1B1F" },
  },
  typography,
};
