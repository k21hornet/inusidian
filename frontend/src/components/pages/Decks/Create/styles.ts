import { colors } from "@/components/theme/colors";

export const cardContentSx = {
  mb: 4,
  p: 3,
  bgColor: colors.white,
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
  borderRadius: 4,
};

export const formDescriptionSx = {
  mb: 2,
  fontSize: "14px",
};

export const formBaseInfoSx = {
  display: { xs: "block", md: "flex" },
  gap: 2,
  mb: 3,
};

export const deckNameInputSx = {
  width: { xs: "100%", md: 225 },
  mb: 2,
};

export const deckDescriptionInputSx = {
  flex: 1,
};

export const formFieldContainerSx = {
  display: { xs: "block", md: "flex" },
  gap: 4,
};

export const formFieldSx = {
  display: "flex",
  gap: 1,
  mb: 2,
};

export const formFieldAddIconSx = {
  mt: 4,
  cursor: "pointer",
};

export const dividerSx = {
  display: { xs: "block", md: "none" },
  my: 3,
};

export const formSubmitButtonSx = {
  display: "flex",
  justifyContent: { xs: "flex-start", md: "flex-end" },
};
