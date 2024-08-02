import { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme.config";
import { CssBaseline } from "@mui/material";
import {
  AlertProvider,
  CustomEventProvider,
  QueryClientProvider,
  SocketContextProvider,
} from "@/providers";
export const metadata: Metadata = {
  title: "Sync",
  description: "Get synced with you friends",
};
// pages are here
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider>
          <SocketContextProvider>
            <AlertProvider>
              <CustomEventProvider>
                <AppRouterCacheProvider>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                  </ThemeProvider>
                </AppRouterCacheProvider>
              </CustomEventProvider>
            </AlertProvider>
          </SocketContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
