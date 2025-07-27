import Sidebar from "@/components/common/Sidebar";
import { Box } from "@mui/material";
import { syncUser } from "../actions/user-actions";

export default async function ServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await syncUser(); // 新規ユーザーがログインした時にユーザー情報を同期

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
