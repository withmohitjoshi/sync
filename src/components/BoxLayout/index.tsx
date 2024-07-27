"use client";
import theme from "@/theme/theme.config";
import { alpha, Container, Paper } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

export const BoxLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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
      <Paper
        sx={{
          p: theme.spacing(4),
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          borderRadius: 2,
          border: `2px solid ${alpha(grey[500], 0.5)}`,
        }}
      >
        {children}
      </Paper>
    </Container>
  );
};
