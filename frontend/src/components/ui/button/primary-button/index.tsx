import { Button } from "@mui/material";

export const PrimaryButton = ({
  children,
  component,
  href,
  onClick,
  type,
}: {
  children: React.ReactNode;
  component?: React.ElementType;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <Button
      component={component ?? "button"}
      href={href ?? undefined}
      onClick={onClick ?? undefined}
      type={type ?? "button"}
      sx={{
        padding: "6px 20px",
        background: "linear-gradient(180deg, #40c4ff 0%, #2962ff 100%)",
        color: "#fff",
        borderRadius: "8px",
      }}
    >
      {children}
    </Button>
  );
};
