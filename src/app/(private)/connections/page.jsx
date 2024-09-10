"use client";
import { useMutation } from "@tanstack/react-query";
import SimpleButton from "../../../components/Button/SimpleButton";
import useGetConnectionsList from "../../../hook/useGetConnectionsList";
import ConnectionListItem from "./components/ConnectionListItem";
import CenterSinner from "../../../components/Loaders/CenterSinner";
import { apiClient } from "../../../lib/interceptor";
import { dispatchRefetchQuery } from "../../../helpers/events";

const Connections = () => {
  const {
    isLoading,
    isFetching,
    data = [],
  } = useGetConnectionsList("connections");

  const { mutate } = useMutation({
    mutationKey: ["remove"],
    mutationFn: (data) =>
      apiClient({
        method: "POST",
        url: "connections/remove",
        data,
      }),
    onSuccess: () => dispatchRefetchQuery("connections-list"),
  });

  if (isLoading || isFetching) return <CenterSinner />;

  return (
    <div className="w-full space-y-2">
      {data.length === 0 && (
        <div className="text-gray-600 text-center">No record</div>
      )}

      {data.map((user) => {
        const { id } = user;
        return (
          <ConnectionListItem
            user={user}
            key={id}
            actionButtons={
              <SimpleButton onClick={() => mutate({ id })}>Remove</SimpleButton>
            }
          />
        );
      })}
    </div>
  );
};

export default Connections;
