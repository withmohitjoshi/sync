"use client";
import theme from "@/theme/theme.config";
import { Box } from "@mui/material";
import React from "react";
import { SearchBar } from "./SearchBar";
import { OptionsDropdown } from "./OptionsDropdown";

export const ConactsList = () => {
  return (
    <Box
      sx={{
        height: "100%",
        p: theme.spacing(2),
      }}
    >
      <Box display={'flex'} gap={2}>
        <SearchBar />
        <OptionsDropdown />
      </Box>
    </Box>
  );
};
