"use client";
import { useMutation } from "@tanstack/react-query";
import useGetConnectionsList from "../../../../hook/useGetConnectionsList";
import ConnectionListItem from "../components/ConnectionListItem";
import SimpleButton from "../../../../components/Button/SimpleButton";
import CenterSinner from "../../../../components/Loaders/CenterSinner";
import { apiClient } from "../../../../lib/interceptor";
import { dispatchRefetchQuery } from "../../../../helpers/events";

const Received = () => {
  const {
    isLoading,
    isFetching,
    data = [],
  } = useGetConnectionsList("received");

  const { mutate: mutateAccept } = useMutation({
    mutationKey: ["accept"],
    mutationFn: (data) =>
      apiClient({
        method: "POST",
        url: "connections/accept",
        data,
      }),
    onSuccess: () => dispatchRefetchQuery("connections-list"),
  });

  const { mutate: mutateReject } = useMutation({
    mutationKey: ["reject"],
    mutationFn: (data) =>
      apiClient({
        method: "POST",
        url: "connections/reject",
        data,
      }),
    onSuccess: () => dispatchRefetchQuery("received-list"),
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
              <>
                <SimpleButton onClick={() => mutateAccept({ id })}>
                  Accept
                </SimpleButton>
                <SimpleButton onClick={() => mutateReject({ id })}>
                  Reject
                </SimpleButton>
              </>
            }
          />
        );
      })}
    </div>
  );
};

export default Received;
