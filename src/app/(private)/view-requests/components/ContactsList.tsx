import { Button, LinearLoader } from "@/components";
import { apiClient } from "@/lib/interceptor";
import { List, ListItem, ListItemText } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GenerateAlert } from "@/providers/AlertProvider";
import { ContactListApiResponseT } from "../types";
import { ContactListItemBox } from "@/components";

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
    select: (data) => data.data.data as ContactListApiResponseT[],
    refetchOnMount: true,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ _id }: { _id: string }) =>
      apiClient({
        method: "POST",
        url: `user/contacts/remove-contact`,
        data: { id: _id },
      }),
    onSuccess: ({ data }) => GenerateAlert.onSuccess(data?.message),
    onSettled: () => refetch(),
  });

  if (status === "pending" || isPending) return <LinearLoader sx={{ mt: 2 }} />;
  return (
    <List>
      {contactsList.length > 0 ? (
        contactsList.map((contact) => {
          const { _id, username } = contact;
          return (
            <ContactListItemBox
              key={_id}
              contact={{ _id, username }}
              handleRenderActionButton={() => (
                <Button
                  variant="text"
                  color="error"
                  onClick={() => mutate({ _id })}
                >
                  Remove
                </Button>
              )}
            />
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
