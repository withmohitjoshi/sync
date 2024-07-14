"use client";
import { Lato } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
