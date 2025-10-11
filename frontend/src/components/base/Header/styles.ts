export const headerSx = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  display: { xs: "none", sm: "flex" },
  justifyContent: "center",
  alignItems: "center",
  height: "64px",
  background: "transparent",
  backdropFilter: "blur(10px)",
};

export const headerContentSx = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  maxWidth: "calc(1280px - 64px)",
  m: "0 32px",
};

export const headerLeftSx = {
  flex: 1,
};

export const gradientTextSx = {
  textDecoration: "none",
  fontSize: "28px",
  fontWeight: "bold",
  background: "linear-gradient(180deg, #40c4ff 0%, #2962ff 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
  display: "inline-block",
};

export const navSx = {
  display: "flex",
  alignItems: "center",
  gap: "64px",
};

export const navItemSx = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
};

export const navLinkSx = {
  fontWeight: 700,
  textDecoration: "none",
  color: "inherit",
};

export const rightSx = {
  flex: 1,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
};

export const userIconSx = {
  flex: 1,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "8px",
};

export const userIconImgSx = {
  width: "34px",
  height: "34px",
  cursor: "pointer",
};

export const headerSpSx = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

export const headerSpWrapperSx = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  display: { xs: "flex", sm: "none" },
  justifyContent: "center",
  alignItems: "center",
  height: "64px",
  background: "transparent",
  backdropFilter: "blur(10px)",
};

export const spMenuSx = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "200px",
  padding: "16px",
};

export const spMenuLinkSx = {
  textDecoration: "none",
  color: "inherit",
  fontSize: "16px",
  fontWeight: "bold",
};
