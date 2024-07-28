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
import { useMutation, useQuery } from "@tanstack/react-query";
import { initialState } from "./constants";
import { dispatchRefetchQuery } from "@/helpers/customevents";

const MyAccountPage = () => {
  const router = useRouter();
  const [state, setState] = useState(initialState);

  const { data = null, isSuccess } = useQuery({
    queryKey: ["get-user-details"],
    queryFn: () =>
      apiClient({
        method: "GET",
        url: "user/get-user-details",
      }),
    select: (data) => data?.data?.data,
  });

  const { mutate } = useMutation({
    mutationKey: ["find-by-email"],
    mutationFn: (data: any) =>
      apiClient({
        method: "PUT",
        url: "user/find-by-email",
        data,
      }),
  });

  // update anyone can find user by email
  const handleFindByEmailChange = useCallback(
    async (value: boolean) => {
      mutate(
        { active: value },
        {
          onSuccess: ({ data }) => {
            GenerateAlert.onSuccess(data?.message);
            dispatchRefetchQuery("get-user-details");
          },
        }
      );
    },
    [mutate]
  );

  // get and then set the user details in state
  useEffect(() => {
    if (isSuccess && data) {
      const { username, email, findByEmail } = data;
      setState((prev) => ({
        ...prev,
        username,
        email,
        findByEmail,
      }));
    }
    return () => setState(initialState);
  }, [data, isSuccess]);

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
