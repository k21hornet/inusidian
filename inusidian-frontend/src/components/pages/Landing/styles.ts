import { SxProps, Theme } from "@mui/material";

export const lpSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: "760px",
  m: "0 auto",
  height: "100vh",
  p: "0 32px",
};

export const lpTitleSx: SxProps<Theme> = {
  display: { xs: "none", md: "block" },
  mb: "24px",
  fontSize: "40px",
  lineHeight: "1.4",
  fontWeight: "bold",
  textAlign: "center",
};
export const lpTitleSpSx: SxProps<Theme> = {
  display: { xs: "block", md: "none" },
  mb: "24px",
  fontSize: "28px",
  fontWeight: "bold",
  textAlign: "center",
};

export const lpTitleHighlightSx: SxProps<Theme> = {
  background: "linear-gradient(180deg, #40c4ff 0%, #2962ff 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export const lpDescriptionSx: SxProps<Theme> = {
  mb: "32px",
  fontSize: { xs: "14px", md: "18px" },
  lineHeight: { xs: "1.5", md: "1.8" },
  textAlign: "center",
};

export const lpButtonsSx: SxProps<Theme> = {
  display: "flex",
  gap: "16px",
};

export const lpButtonSx: SxProps<Theme> = {
  width: "160px",
};
