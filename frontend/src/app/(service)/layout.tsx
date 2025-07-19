import Appbar from "@/components/common/Appbar";
import Sidebar from "@/components/common/Sidebar";
import { Box } from "@mui/material";

export default function ServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      sx={{
        display: "flex",
        m: 0,
        p: 0,
        backgroundColor: "#fafafa",
      }}
    >
      <Sidebar />
      <Box component="main" sx={{ flex: 1, px: 4, py: 2 }}>
        {/* <Appbar /> */}
        {children}
      </Box>
    </Box>
  );
}
