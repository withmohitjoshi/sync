import { Metadata } from "next";
import "./globals.scss";
import { SocketProvider } from "@/providers/SocketContext";

export const metadata: Metadata = {
  title: "Sync",
  description: "Get synced with you friends",
};

const uri = `${process.env.SERVER_URL}:${process.env.SERVER_PORT}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SocketProvider uri={uri}>{children}</SocketProvider>
      </body>
    </html>
  );
}
