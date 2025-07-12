import { Box } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <Box component="body" sx={{ m: 0, p: 0, backgroundColor: "#fafafa" }}>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </Box>
    </html>
  );
}
