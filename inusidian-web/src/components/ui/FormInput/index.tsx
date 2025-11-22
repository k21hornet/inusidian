import { colors } from "@/components/theme/colors";
import { Box, FormLabel, SxProps, TextField, Theme } from "@mui/material";

export const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder = "",
  sx,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  sx?: SxProps<Theme>;
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, ...sx }}>
      <FormLabel
        htmlFor={name}
        sx={{
          fontSize: "12px",
          fontWeight: 700,
        }}
      >
        {label}
      </FormLabel>
      <TextField
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "& fieldset": {
              borderColor: colors.black500,
            },
          },
          "& .MuiInputBase-input": {
            p: "10px 16px",
            fontSize: "14px",
          },
        }}
      />
    </Box>
  );
};
