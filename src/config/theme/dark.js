import { grey } from "@mui/material/colors";
import typography from "./typography";
import breakpoints from "./breakpoints";

export const darkTheme = {
  palette: {
    mode: "dark",
    primary: {
      main: "#1AAB9B",
      grey1: grey[900],
      grey2: grey[800],
    },
    text: {
      primary: "#FFF",
      title: "#FFF",
    },
    background: {
      default: "#1A1B1F",
      gradient1:
        "linear-gradient(87deg, rgba(46,48,53,1) 0%, rgba(46,48,53,1) 46%, rgba(49,52,58,1) 100%)",
    },
  },
  typography,
  breakpoints,
};
