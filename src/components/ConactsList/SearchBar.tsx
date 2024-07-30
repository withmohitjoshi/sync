import {
  Avatar,
  Box,
  Button,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { USERNAME_MAX_LENGTH } from "@/helpers/constants";
import React, { useCallback, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/interceptor";
import { LinearLoader } from "../Loaders";
import { debounceFn } from "@/helpers/client-utils";
import theme from "@/theme/theme.config";
import { GenerateAlert } from "@/providers/AlertProvider";

export const SearchBar = () => {
  const [search, setSearch] = useState("");

  const {
    data = [],
    status,
    refetch,
  } = useQuery({
    queryKey: ["user/contacts/get-searched-list", search],
    queryFn: () =>
      apiClient({
        method: "GET",
        url: `user/contacts/get-searched-list?search=${search}`,
      }),
    select: (data) => data.data.data,
    enabled: Boolean(search),
  });

  const { mutate } = useMutation({
    mutationFn: (data: {
      type: "send" | "cancel" | "ignore" | "accept";
      _id: string;
    }) => {
      console.log(data);

      const typesObject = {
        send: "send-request",
        cancel: "cancel-request",
        ignore: "ignore-request",
        accept: "accept-request",
      };
      return apiClient({
        method: "POST",
        url: `user/contacts/${typesObject[data.type]}`,
        data: { id: data._id },
      });
    },
    onSuccess: ({ data }) => {
      GenerateAlert.onSuccess(data?.message);
      refetch();
    },
  });

  const handleRenderButton = useCallback(
    (contact: any): React.ReactNode => {
      const { _id, isContact, isRequestReceived, isRequestSent } = contact;
      if (isContact) {
        return <ListViewButton>Chat</ListViewButton>;
      } else if (isRequestSent) {
        return (
          <ListViewButton onClick={() => mutate({ type: "cancel", _id })}>
            Cancel
          </ListViewButton>
        );
      } else if (isRequestReceived) {
        return (
          <Box sx={{ display: "flex", gap: 2 }}>
            <ListViewButton onClick={() => mutate({ type: "accept", _id })}>
              Accept
            </ListViewButton>
            <ListViewButton
              color="secondary"
              onClick={() => mutate({ type: "ignore", _id })}
            >
              Ignore
            </ListViewButton>
          </Box>
        );
      } else if (!isContact) {
        return (
          <ListViewButton onClick={() => mutate({ type: "send", _id })}>
            Add
          </ListViewButton>
        );
      }
    },
    [mutate]
  );

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search by username"
        inputProps={{ maxLength: USERNAME_MAX_LENGTH }}
        onChange={({ target }) =>
          target.value
            ? debounceFn()(() => setSearch(target.value))
            : setSearch("")
        }
      />
      {search && (
        <SearchDropdown>
          {status === "pending" ? (
            <LinearLoader />
          ) : (
            <List>
              {data.length > 0 ? (
                data.map((contact: any) => {
                  const { _id, username } = contact;
                  return (
                    <ListItem
                      key={_id}
                      secondaryAction={handleRenderButton(contact)}
                      sx={{
                        "&:hover": {
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: theme.shape.borderRadius,
                          cursor: "pointer",
                        },
                      }}
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
          )}
        </SearchDropdown>
      )}
    </Search>
  );
};

const ListViewButton = styled(Button)(({ theme }) => ({
  borderRadius: "50px",
}));

const Search = styled(Box)(({ theme }) => ({
  width: "100%",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.background.paper, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.background.paper, 0.5),
  },
}));

const SearchIconWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));
const SearchDropdown = styled(Box)(({ theme }) => ({
  position: "absolute",
  padding: theme.spacing(2),
  margin: theme.spacing(1, 0),
  backgroundColor: alpha(theme.palette.background.paper, 0.5),
  borderRadius: theme.shape.borderRadius * 2,
  width: "100%",
  minHeight: "50vh",
  overflowY: "auto",
}));
