import { Metadata } from "next";
import "./globals.scss";
import { SocketProvider } from "@/providers/SocketContext";

export const metadata: Metadata = {
  title: "Sync",
  description: "Get synced with you friends",
};

const uri =
  process.env.MODE === "DEV"
    ? `${process.env.SERVER_URL}:${process.env.SERVER_PORT}`
    : `${process.env.SERVER_URL}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log({ uri });

  return (
    <html lang="en">
      <body>
        <SocketProvider uri={uri}>{children}</SocketProvider>
      </body>
    </html>
  );
}
