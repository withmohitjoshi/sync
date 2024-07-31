import {
  Box,
  Button,
  ClickAwayListener,
  InputBase,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { EMAIL_MAX_LENGTH } from "@/helpers/constants";
import React, { useCallback, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/interceptor";
import { debounceFn } from "@/helpers/client-utils";
import { GenerateAlert } from "@/providers/AlertProvider";
import { LinearLoader } from "@/components";
import { requestOptionsTypesLookup } from "../constants";
import { ContactListItemBox } from "@/components/ContactListItemBox";

export const SearchBar = () => {
  const [search, setSearch] = useState("");

  const {
    data = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["get-searched-list", search],
    queryFn: () =>
      apiClient({
        method: "GET",
        url: `user/contacts/get-searched-list?search=${search}`,
      }),
    select: (data) => data.data.data as SearchedContactListApiResponseT[],
    enabled: Boolean(search),
    staleTime: 0,
  });

  const { mutate } = useMutation({
    mutationFn: ({
      type,
      _id,
    }: {
      type: "send" | "cancel" | "ignore" | "accept";
      _id: string;
    }) =>
      apiClient({
        method: "POST",
        url: `user/contacts/${requestOptionsTypesLookup[type]}`,
        data: { id: _id },
      }),
    onSuccess: ({ data }) => GenerateAlert.onSuccess(data?.message),
    onSettled: () => refetch(),
  });

  const handleRenderActionButton = useCallback(
    (contact: SearchedContactListApiResponseT): React.ReactNode => {
      const { _id, isContact, isRequestReceived, isRequestSent } = contact;
      if (isContact) {
        return <ListActionButton>Chat</ListActionButton>;
      }

      if (isRequestSent) {
        return (
          <ListActionButton
            color="error"
            onClick={() => mutate({ type: "cancel", _id })}
          >
            Cancel
          </ListActionButton>
        );
      }
      if (isRequestReceived) {
        return (
          <Box sx={{ display: "flex", gap: 2 }}>
            <ListActionButton onClick={() => mutate({ type: "accept", _id })}>
              Accept
            </ListActionButton>
            <ListActionButton
              color="secondary"
              onClick={() => mutate({ type: "ignore", _id })}
            >
              Ignore
            </ListActionButton>
          </Box>
        );
      }
      if (!isContact) {
        return (
          <ListActionButton onClick={() => mutate({ type: "send", _id })}>
            Add
          </ListActionButton>
        );
      }
    },
    [mutate]
  );

  const isQueryLoading = [isLoading, isFetching].some((l) => l);

  return (
    <SearchBox>
      <IconWrapper>
        <SearchIcon />
      </IconWrapper>
      <SearchInput
        placeholder="Search by username"
        inputProps={{ maxLength: EMAIL_MAX_LENGTH }}
        onChange={({ target }) =>
          target.value
            ? debounceFn()(() => setSearch(target.value))
            : setSearch("")
        }
      />
      {search && (
        <ClickAwayListener onClickAway={() => setSearch("")}>
          <SearchDropdown>
            {isQueryLoading && <LinearLoader />}
            {!isQueryLoading && (
              <List>
                {data.length > 0 ? (
                  data.map((contact) => {
                    const { _id, username } = contact;
                    return (
                      <ContactListItemBox
                        key={_id}
                        isActionButton
                        contact={{ _id, username }}
                        handleRenderActionButton={() =>
                          handleRenderActionButton(contact)
                        }
                      />
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
        </ClickAwayListener>
      )}
    </SearchBox>
  );
};

const ListActionButton = styled(Button)(() => ({
  borderRadius: "50px",
}));

const SearchBox = styled(Box)(({ theme }) => ({
  width: "100%",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.background.paper, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.background.paper, 0.5),
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
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
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  height: "45vh",
  overflowY: "auto",
}));
