import { Box } from "@mui/material";

export default function StaticLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box component="body" sx={{ m: 0, p: 0, backgroundColor: "#fafafa" }}>
      {children}
    </Box>
  );
}
