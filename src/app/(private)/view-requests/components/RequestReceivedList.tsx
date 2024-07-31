import { Button, LinearLoader } from "@/components";
import { apiClient } from "@/lib/interceptor";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GenerateAlert } from "@/providers/AlertProvider";
import { dispatchRefetchQuery } from "@/helpers/customevents";
import { ContactListApiResponseT } from "../types";
import { ContactListItemBox } from "@/components";

const typesObject = {
  ignore: "ignore-request",
  accept: "accept-request",
};

export const RequestReceivedList = () => {
  const { data: receivedRequestList = [], status } = useQuery({
    queryKey: ["get-received-request-list"],
    queryFn: () =>
      apiClient({
        method: "GET",
        url: "user/contacts/get-received-request-list",
      }),
    select: (data) => data.data.data as ContactListApiResponseT[],
    refetchOnMount: "always",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ type, _id }: { type: "ignore" | "accept"; _id: string }) =>
      apiClient({
        method: "POST",
        url: `user/contacts/${typesObject[type]}`,
        data: { id: _id },
      }),
    onSuccess: ({ data }) => GenerateAlert.onSuccess(data?.message),
    onSettled: () =>
      dispatchRefetchQuery(["get-contacts-list", "get-received-request-list"]),
  });

  if (status === "pending" || isPending) return <LinearLoader sx={{ mt: 2 }} />;
  return (
    <List>
      {receivedRequestList.length > 0 ? (
        receivedRequestList.map((contact) => {
          const { _id, username } = contact;
          return (
            <ContactListItemBox
              key={_id}
              contact={{ _id, username }}
              handleRenderActionButton={() => (
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
