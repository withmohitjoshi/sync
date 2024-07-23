"use client";
import { alpha, Box, Container } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function PublicRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: 4,
          flexGrow: 0.2,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          borderRadius: 3,
          border: `2px solid ${alpha(grey[500], 0.5)}`,
        }}
      >
        {children}
      </Box>
    </Container>
  );
}
