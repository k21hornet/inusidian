import { colors } from "@/components/theme/colors";

export const cardPageSx = {
  pt: 2,
};

export const cardPageBackSx = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  width: "fit-content",
  mb: 2,
  cursor: "pointer",
  color: colors.blueA400,
  fontWeight: "bold",
  "&:hover": {
    opacity: 0.8,
    textDecoration: "underline",
  },
};

export const cardContentSx = {
  mb: 4,
  p: 3,
  bgColor: colors.white,
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
  borderRadius: 4,
};

export const cardContentIconsSx = {
  display: "flex",
  justifyContent: "end",
  gap: 1,
};

export const cardContentIconSx = {
  cursor: "pointer",
};

export const cardContentTextSx = {
  mb: 2,
  fontSize: 16,
  textAlign: "center",
};

export const cardContentAccordionSx = {
  width: "100%",
  backgroundColor: "transparent",
  border: "none",
  borderTop: "1px solid #e0e0e0",
  boxShadow: "none",
};

export const cardContentAccordionSummaryColorSx = {
  color: colors.black500,
};

export const cardContentAccordionDetailsSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const cardContentButtonsSx = {
  display: "flex",
  justifyContent: "space-between",
  gap: 2,
  width: "100%",
};
