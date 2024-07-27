import { BoxLayout } from "@/components";

export default function PublicRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BoxLayout>{children}</BoxLayout>;
}
