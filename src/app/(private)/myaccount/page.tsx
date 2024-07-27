"use client";
import theme from "@/theme/theme.config";
import { Box, List, ListItem, ListItemText, Switch } from "@mui/material";
import { ChangeProfilePicture } from "./components/ChangeProfilePicture";
import { ChangeUsername } from "./components/ChangeUsername";
import { DisplayUserEmail } from "./components/DisplayUserEmail";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { useRouter } from "next/navigation";
import { BoxLayout } from "@/components";

const MyAccountPage = () => {
  const router = useRouter();
  return (
    <BoxLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(2),
        }}
      >
        <ChangeProfilePicture />
        <DisplayUserEmail />
        <ChangeUsername />
        <List sx={{ width: "100%", bgcolor: "transparent" }}>
          <ListItem sx={{ px: 0 }}>
            <ListItemText>Anyone can find me by email</ListItemText>
            <Switch edge="end" onChange={() => {}} checked={false} />
          </ListItem>
          <ListItem
            sx={{ px: 0, cursor: "pointer" }}
            onClick={() => router.push("/change-password")}
          >
            <ListItemText>Change Password</ListItemText>
            <NavigateNextRoundedIcon />
          </ListItem>
        </List>
      </Box>
    </BoxLayout>
  );
};

export default MyAccountPage;
