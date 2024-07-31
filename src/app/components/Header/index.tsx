"use client";
import { AccountCircle } from "@mui/icons-material";
import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Sync
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <IconButton edge="end" onClick={() => router.push("/myaccount")}>
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
