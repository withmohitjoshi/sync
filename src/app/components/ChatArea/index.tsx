"use client";
import { useChat } from "@/hooks";
import theme from "@/theme/theme.config";
import { MoreVertRounded } from "@mui/icons-material";
import {
  alpha,
  AppBar,
  Box,
  Divider,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { grey } from "@mui/material/colors";

export const ChatArea = () => {
  const { state } = useChat();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        p: theme.spacing(2),
      }}
    >
      <Box
        sx={{
          border: `2px solid ${alpha(grey[500], 0.3)}`,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          <Toolbar
            sx={{
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Typography variant="h6" noWrap component="div">
              Name
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconButton edge="end">
                <MoreVertRounded />
              </IconButton>
            </Box>
          </Toolbar>
          <Divider />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            backgroundColor: alpha(theme.palette.background.paper, 0.5),
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {Array(20)
            .fill(1)
            .map((_, i) => {
              return i % 2 === 0 ? <RightMessage /> : <LeftMessage />;
            })}
        </Box>
        <Box
          sx={{
            p: theme.spacing(2),
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: theme.spacing(1),
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <TextField fullWidth placeholder="Enter message..." />
          <IconButton>
            <SendRoundedIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

const RightMessage = () => (
  <Box
    sx={{
      alignSelf: "flex-end",
      width: "fit-content",
      maxWidth: "50%",
      padding: theme.spacing(1),
      margin: theme.spacing(1),
      backgroundColor: alpha(theme.palette.success.dark, 0.5),
      borderRadius: theme.shape.borderRadius / 4,
      color: theme.palette.text.primary,
      height: "fit-content",
    }}
  >
    this is my cat say hello to her
  </Box>
);
const LeftMessage = () => (
  <Box
    sx={{
      alignSelf: "flex-start",
      width: "fit-content",
      maxWidth: "50%",
      padding: theme.spacing(1),
      margin: theme.spacing(1),
      backgroundColor: alpha(theme.palette.info.dark, 0.5),
      borderRadius: theme.shape.borderRadius / 4,
      color: theme.palette.text.primary,
      height: "fit-content",
    }}
  >
    this is my cat say hello to her
  </Box>
);
