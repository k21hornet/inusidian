import { Box, Typography } from "@mui/material";
import { footerSx, footerTextSx } from "./styles";

export const Footer = () => {
  return (
    <Box component="footer" sx={footerSx}>
      <Typography sx={footerTextSx}>
        &copy; 2025 Chihuahua Washawasha
      </Typography>
    </Box>
  );
};
