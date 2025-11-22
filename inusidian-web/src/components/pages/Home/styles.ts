export const homePageSx = {
  mb: "20px",
};

export const homeReportSx = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: { xs: "column", md: "row" },
  mb: "24px",
  gap: "24px",
};

export const homeReportBoxSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "240px",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
  borderRadius: "16px",
  backgroundColor: "#fff",
  color: "#888",
  position: "relative",
};

export const homeReportBoxImgSx = {
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain",
  objectPosition: "center",
  display: "block",
  filter: "blur(8px)",
};

export const homeReportBoxOverlaySx = {
  position: "absolute",
  inset: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  pointerEvents: "none",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
};
