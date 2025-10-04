import { Button } from "@mui/material";

export const SecondaryButton = ({
  children,
  component,
  href,
  onClick,
  type,
  variant,
}: {
  children: React.ReactNode;
  component?: React.ElementType;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "contained" | "outlined";
}) => {
  return (
    <Button
      component={component ?? "button"}
      href={href ?? undefined}
      onClick={onClick ?? undefined}
      type={type ?? "button"}
      sx={{
        padding: "6px 20px",
        background:
          variant === "contained"
            ? "linear-gradient(180deg, #455a64 0%, #263238 100%)"
            : "transparent",
        color: variant === "contained" ? "#fff" : "#263238",
        border: variant === "outlined" ? "1px solid #263238" : "none",
        borderRadius: "8px",
      }}
    >
      {children}
    </Button>
  );
};
