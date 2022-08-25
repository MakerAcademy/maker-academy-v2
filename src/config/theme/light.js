import { grey } from "@mui/material/colors";
import typography from "./typography";
import breakpoints from "./breakpoints";

export const lightTheme = {
  palette: {
    mode: "light",
    primary: {
      main: "#1ABC9C",
      dark: "#0c6e5a",
      grey1: grey[100],
      grey2: grey[200],
      grey3: grey[300],
      grey4: grey[400],
      grey5: grey[500],
      grey6: grey[600],
      grey8: grey[800],
      grey9: grey[900],
    },
    text: {
      primary: "#425466",
      title: "#333333",
      invert: "#fff",
    },
    background: {
      default: "#F6FAF9",
      dark: "#333333",
      gradient1:
        "linear-gradient(335deg, rgba(245,252,239,1) 13%, rgba(250,255,247,1) 38%, rgba(255,255,255,1) 100%)",
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
