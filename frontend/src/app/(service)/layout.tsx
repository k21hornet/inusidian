import { Box } from "@mui/material";
import { syncUser } from "../actions/user";
import { Header } from "@/components/common/header";

export default async function ServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await syncUser(); // 新規ユーザーがログインした時にユーザー情報を同期

  return (
    <Box
      sx={{
        maxWidth: "1280px",
        mx: "auto",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Header />
      <Box component="main" sx={{ px: 2, pt: 2 }}>
        {children}
      </Box>
    </Box>
  );
}
