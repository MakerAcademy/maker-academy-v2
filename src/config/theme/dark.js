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
      grey3: grey[700],
      grey4: grey[600],
      grey5: grey[500],
      grey6: grey[400],
    },
    text: {
      primary: "#FFF",
      title: "#FFF",
      invert: "#425466",
    },
    background: {
      default: "#1A1B1F",
      paper: "rgba(46,48,53,1)",
      gradient1:
        "linear-gradient(87deg, rgba(46,48,53,1) 0%, rgba(46,48,53,1) 46%, rgba(49,52,58,1) 100%)",
    },
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        input: {
          fontSize: "1rem",
          // "&::placeholder": {
          //   color: "red",
          // },
        },
      },
    },
  },
  typography,
  breakpoints,
};
