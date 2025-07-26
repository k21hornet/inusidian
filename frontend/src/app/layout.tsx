import { Auth0Provider } from "@auth0/nextjs-auth0";
import { Box } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Auth0Provider>
      <html lang="ja">
        <Box component="body" sx={{ m: 0, p: 0, backgroundColor: "#fafafa" }}>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </Box>
      </html>
    </Auth0Provider>
  );
}
