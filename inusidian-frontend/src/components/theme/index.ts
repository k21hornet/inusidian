"use client";
import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: `linear-gradient(
            135deg,
            rgba(64, 196, 255, 0.06) 0%,
            rgba(255, 255, 255, 0.9) 25%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(41, 98, 255, 0.06) 75%,
            rgba(64, 196, 255, 0.03) 100%
          )`,
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        },
      },
    },
  },
});
