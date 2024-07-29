"use client";
import theme from "@/theme/theme.config";
import { Box, Grid } from "@mui/material";
import React from "react";
import { SearchBar } from "./SearchBar";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/interceptor";
import { Spinner } from "../Loaders";

export const ConactsList = () => {
  const {
    data: contactsList = [],
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["get-contacts-list"],
    queryFn: () =>
      apiClient({
        method: "GET",
        url: "user/contacts/get-contacts-list",
      }),
    select: (data) => data.data.data,
  });

  const isQueryLoading = [isFetching, isLoading].some((l) => l);
  return (
    <Box
      sx={{
        height: "100%",
        p: theme.spacing(2),
      }}
    >
      <SearchBar />
      {isQueryLoading && (
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          height={"100%"}
        >
          <Spinner thickness={2} />
        </Grid>
      )}
      {!isQueryLoading && <></>}
    </Box>
  );
};

// const list = [
//   {
//     username: "",
//     lastMessageTimestamp: Date.now(),
//     unreadMessageCount: 0,
//     lastMessageSendBy: "",
//     contactId: "",
//   },
// ];
