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
        <Box
          component="body"
          sx={{
            m: 0,
            p: 0,
            minHeight: "100vh",
            background: `linear-gradient(
        135deg,
        rgba(64, 196, 255, 0.06) 0%,
        rgba(255, 255, 255, 0.9) 25%,
        rgba(255, 255, 255, 0.05) 50%,
        rgba(41, 98, 255, 0.06) 75%,
        rgba(64, 196, 255, 0.03) 100%
      );`,
          }}
        >
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </Box>
      </html>
    </Auth0Provider>
  );
}
