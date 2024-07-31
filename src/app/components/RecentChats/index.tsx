"use client";
import theme from "@/theme/theme.config";
import { Box } from "@mui/material";
import { SearchBar } from "./components/SearchBar";
import { OptionsDropdown } from "./components/OptionsDropdown";

export const RecentChats = () => {
  return (
    <Box
      sx={{
        height: "100%",
        p: theme.spacing(2),
      }}
    >
      <Box display={"flex"} gap={2}>
        <SearchBar />
        <OptionsDropdown />
      </Box>
    </Box>
  );
};
