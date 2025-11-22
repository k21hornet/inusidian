import { Box } from "@mui/material";
import { Header } from "@/components/base/Header";
import { Footer } from "@/components/base/Footer/idnex";

export default async function ServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      sx={{
        maxWidth: "1280px",
        mx: "auto",
      }}
    >
      <Header />
      <Box component="main" sx={{ px: { xs: 2, md: 8 }, pt: 8 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
