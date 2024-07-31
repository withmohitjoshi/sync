import { Button, LinearLoader } from "@/components";
import { apiClient } from "@/lib/interceptor";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ContactListT } from "../page";
import { GenerateAlert } from "@/providers/AlertProvider";

export const ContactsList = () => {
  const {
    data: contactsList = [],
    status,
    refetch,
  } = useQuery({
    queryKey: ["get-contacts-list"],
    queryFn: () =>
      apiClient({
        method: "GET",
        url: "user/contacts/get-contacts-list",
      }),
    select: (data) => data.data.data as ContactListT[],
    refetchOnMount:true
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { _id: string }) =>
      apiClient({
        method: "POST",
        url: `user/contacts/remove-contact`,
        data: { id: data._id },
      }),
    onSuccess: ({ data }) => GenerateAlert.onSuccess(data?.message),
    onSettled: () => refetch(),
  });

  if (status === "pending" || isPending) return <LinearLoader sx={{ mt: 2 }} />;
  return (
    <List>
      {contactsList.length > 0 ? (
        contactsList.map((contact: ContactListT) => {
          const { _id, username } = contact;
          return (
            <ListItem
              key={_id}
              secondaryAction={
                <Button
                  variant="text"
                  color="error"
                  onClick={() => mutate({ _id })}
                >
                  Remove
                </Button>
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
