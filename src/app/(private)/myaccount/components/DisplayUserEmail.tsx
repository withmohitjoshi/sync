import { Box, Typography } from "@mui/material";
import React from "react";

export const DisplayUserEmail = ({ email }: { email: string }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <Typography variant="body2" sx={{ opacity: 0.5, letterSpacing: 1 }}>
        {email}
      </Typography>
    </Box>
  );
};
