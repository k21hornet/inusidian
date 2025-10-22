import { SxProps, Theme, Typography } from "@mui/material";

export const Heading = ({
  children,
  variant,
  sx,
}: {
  children: React.ReactNode;
  variant: "h1" | "h2" | "h3" | "h4";
  sx?: SxProps<Theme>;
}) => {
  const fontSizes = {
    h1: "22px",
    h2: "20px",
    h3: "18px",
    h4: "16px",
  };
  return (
    <Typography sx={{ fontSize: fontSizes[variant], fontWeight: 700, ...sx }}>
      {children}
    </Typography>
  );
};
