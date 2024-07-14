import React from "react";

export default function PublicRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="publicPages">{children}</div>
}
