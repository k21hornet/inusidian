import { Auth0Provider } from "@auth0/nextjs-auth0";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/components/theme";
import { CssBaseline } from "@mui/material";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Auth0Provider>
      <html lang="ja" className={roboto.variable}>
        <body>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </Auth0Provider>
  );
}
