import { Button, LinearLoader } from "@/components";
import { apiClient } from "@/lib/interceptor";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ContactListT } from "../page";
import { GenerateAlert } from "@/providers/AlertProvider";

const typesObject = {
  ignore: "ignore-request",
  accept: "accept-request",
};

export const RequestReceivedList = () => {
  const {
    data: receivedRequestList = [],
    status,
    refetch,
  } = useQuery({
    queryKey: ["get-received-request-list"],
    queryFn: () =>
      apiClient({
        method: "GET",
        url: "user/contacts/get-received-request-list",
      }),
    select: (data) => data.data.data as ContactListT[],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { type: "ignore" | "accept"; _id: string }) =>
      apiClient({
        method: "POST",
        url: `user/contacts/${typesObject[data.type]}`,
        data: { id: data._id },
      }),
    onSuccess: ({ data }) => GenerateAlert.onSuccess(data?.message),
    onSettled: () => refetch(),
  });

  if (status === "pending" || isPending) return <LinearLoader sx={{ mt: 2 }} />;
  return (
    <List>
      {receivedRequestList.length > 0 ? (
        receivedRequestList.map((contact: ContactListT) => {
          const { _id, username } = contact;
          return (
            <ListItem
              key={_id}
              secondaryAction={
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="text"
                    onClick={() => mutate({ type: "accept", _id })}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={() => mutate({ type: "ignore", _id })}
                  >
                    Ignore
                  </Button>
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar>{username[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={username} />
            </ListItem>
          );
        })
      ) : (
        <ListItem>
          <ListItemText>No user found</ListItemText>
        </ListItem>
      )}
    </List>
  );
};
