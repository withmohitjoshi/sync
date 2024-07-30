"use client";
import theme from "@/theme/theme.config";
import { Box } from "@mui/material";
import React from "react";
import { SearchBar } from "./SearchBar";

export const ConactsList = () => {
  return (
    <Box
      sx={{
        height: "100%",
        p: theme.spacing(2),
      }}
    >
      <SearchBar />
    </Box>
  );
};
