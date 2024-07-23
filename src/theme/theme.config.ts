"use client";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#40A2E3",
      },
      secondary: {
        main: "#0D9276",
      },
      error: {
        main: "#e01563",
      },
      warning: {
        main: "#ffc107",
      },
      background: {
        default: "#212121",
        paper: "#303030",
      },
      text: {
        primary: "#e0f2f1",
        secondary: "rgba(224, 242, 241, 0.7)",
      },
    },
    components: {
      MuiLink: {
        defaultProps: {
          underline: "none",
          color: "primary.light",
        },
      },
    },
  })
);

export default theme;
