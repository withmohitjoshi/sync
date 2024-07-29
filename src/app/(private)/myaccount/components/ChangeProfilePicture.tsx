import React from "react";
import { alpha, Avatar, Box, IconButton } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import theme from "@/theme/theme.config";
export const ChangeProfilePicture = ({ username }: { username: string }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Box position={"relative"} borderRadius={"50%"}>
        <Avatar
          sx={{
            width: 90,
            height: 90,
            fontSize: "2rem",
          }}
        >
          {username?.[0] ?? "U"}
        </Avatar>
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            bottom: -5,
            right: -5,
            padding: 1,
            zIndex: 100,
            color: "inherit",
            borderRadius: "50%",
            cursor: "pointer",
            backgroundColor: alpha(theme.palette.background.paper, 0.5),
            "&:hover": {
              backgroundColor: alpha(theme.palette.background.paper, 1),
            },
          }}
        >
          <EditRoundedIcon fontSize={"small"} />
        </IconButton>
      </Box>
    </Box>
  );
};
