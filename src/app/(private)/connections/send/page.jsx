"use client";
import CenterSinner from "../../../../components/Loaders/CenterSinner";
import useGetConnectionsList from "../../../../hook/useGetConnectionsList";
import ConnectionListItem from "../components/ConnectionListItem";
import SimpleButton from "../../../../components/Button/SimpleButton";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../../lib/interceptor";
import { dispatchRefetchQuery } from "../../../../helpers/events";

const Send = () => {
  const { isLoading, isFetching, data = [] } = useGetConnectionsList("send");

  const { mutate } = useMutation({
    mutationKey: ["cancel"],
    mutationFn: (data) =>
      apiClient({
        method: "POST",
        url: "connections/cancel",
        data,
      }),
    onSuccess: () => dispatchRefetchQuery("send-list"),
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
              <SimpleButton onClick={() => mutate({ id })}>Cancel</SimpleButton>
            }
          />
        );
      })}
    </div>
  );
};

export default Send;
