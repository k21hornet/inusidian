import { Button as MuiButton, SxProps, Theme } from "@mui/material";

export const Button = ({
  children,
  variant = "contained",
  component = "button",
  href = undefined,
  onClick = undefined,
  type = "button",
  buttonDesign = "primary",
  sx,
}: {
  children: React.ReactNode;
  variant?: "contained" | "outlined";
  component?: React.ElementType;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  buttonDesign?: "primary" | "secondary";
  sx?: SxProps<Theme>;
}) => {
  const originalSx =
    buttonDesign === "primary"
      ? {
          background:
            variant === "contained"
              ? "linear-gradient(180deg, #40c4ff 0%, #2962ff 100%)"
              : "transparent",
          color: variant === "contained" ? "#fff" : "#40c4ff",
          border: variant === "outlined" ? "1px solid #40c4ff" : "none",
        }
      : {
          background:
            variant === "contained"
              ? "linear-gradient(180deg, #263238 0%, #000000 100%)"
              : "transparent",
          color: variant === "contained" ? "#fff" : "#263238",
          border: variant === "outlined" ? "1px solid #263238" : "none",
        };

  return (
    <MuiButton
      variant={variant}
      component={component}
      href={href}
      onClick={onClick}
      type={type}
      sx={{
        padding: "6px 20px",
        borderRadius: "8px",
        ...sx,
        ...originalSx,
      }}
    >
      {children}
    </MuiButton>
  );
};
