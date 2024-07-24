import { Metadata } from "next";
import { SocketProvider } from "@/providers/SocketContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme.config";
import { CssBaseline } from "@mui/material";
import { AlertProvider } from "@/providers/AlertContext";
import { CustomEventProvider } from "@/providers/CustomEventProvider";
export const metadata: Metadata = {
  title: "Sync",
  description: "Get synced with you friends",
};

const uri = `${process.env.NEXT_PUBLIC_SERVER_BASEURL}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SocketProvider uri={uri}>
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
        </SocketProvider>
      </body>
    </html>
  );
}
