"use client";
import theme from "@/theme/theme.config";
import { Box, List, ListItem, ListItemText, Switch } from "@mui/material";
import { ChangeProfilePicture } from "./components/ChangeProfilePicture";
import { ChangeUsername } from "./components/ChangeUsername";
import { DisplayUserEmail } from "./components/DisplayUserEmail";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { useRouter } from "next/navigation";
import { BoxLayout } from "@/components";
import { apiClient } from "@/lib/interceptor";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GenerateAlert } from "@/providers/AlertProvider";

const MyAccountPage = () => {
  const router = useRouter();
  const [state, setState] = useState({
    username: "",
    findByEmail: true,
    email: "",
  });

  // get user details
  const getUserDetails = useCallback(async (signal: AbortSignal) => {
    const response = await apiClient({
      method: "GET",
      url: "user/get-user-details",
      signal,
    });
    const { username, email, findByEmail } = response.data?.data || {};
    setState((prev) => ({
      ...prev,
      username,
      email,
      findByEmail,
    }));
  }, []);

  // update anyone can find user by email
  const handleFindByEmailChange = useCallback(async (value: boolean) => {
    const response = await apiClient({
      method: "PUT",
      url: "user/find-by-email",
      data: { active: value },
    });
    if (response.status === 200) {
      new GenerateAlert({
        message: response.data?.message,
      });
      setState((prev) => ({
        ...prev,
        findByEmail: value,
      }));
    }
  }, []);

  // get and then set the user details in state
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getUserDetails(signal);
    return () => controller.abort();
  }, [getUserDetails]);

  const { username, email, findByEmail } = useMemo(() => state, [state]);

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
        <DisplayUserEmail email={email} />
        <ChangeUsername username={username} />
        <List sx={{ width: "100%", bgcolor: "transparent" }}>
          <ListItem sx={{ px: 0 }}>
            <ListItemText>Anyone can find me by email</ListItemText>
            <Switch
              edge="end"
              checked={findByEmail}
              onChange={({ target }) => handleFindByEmailChange(target.checked)}
            />
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
