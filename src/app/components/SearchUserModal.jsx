"use client";

import { useCallback, useEffect, useState } from "react";
import Modal from "@/components/Layouts/Modal";
import SearchInput from "@/components/Input/SearchInput";
import { USERNAME_MAX_LENGTH } from "@/helpers/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/interceptor";
import { debounceFn } from "@/helpers/functions";
import CenterSinner from "@/components/Loaders/CenterSinner";
import Avatar from "@/components/Avatar";
import SimpleButton from "@/components/Button/SimpleButton";
import { Plus } from "lucide-react";

export default function SearchUserModal() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["searched-list", query],
    enabled: Boolean(isOpen),
    queryFn: () =>
      apiClient({
        method: "GET",
        url: `user/searched-list`,
        params: { query },
      }),
    select: (data) => data?.data?.data,
  });

  const { mutate } = useMutation({
    mutationKey: ["send"],
    mutationFn: (data) =>
      apiClient({
        method: "POST",
        url: "connections/send",
        data,
      }),
    onSuccess: () => refetch(),
  });

  const toggleOpenSearchUserModal = () => setIsOpen((p) => !p);

  const handleOnChange = useCallback(
    (value) => debounceFn((v) => setQuery(v))(value),
    []
  );

  return (
    <>
      <Plus size={20} onClick={toggleOpenSearchUserModal} />
      <Modal
        isOpen={isOpen}
        onClose={() => {
          toggleOpenSearchUserModal();
          setQuery("");
        }}
        title={"Search Users"}
      >
        <SearchInput
          placeholder={"Search usernames..."}
          maxLength={USERNAME_MAX_LENGTH}
          onChange={(e) => handleOnChange(e.target.value)}
        />
        <div className="min-h-[40vh] max-h-[40vh] mt-3 overflow-y-auto">
          {isLoading && <CenterSinner />}
          {data.length === 0 && (
            <div className="text-gray-600 text-center">No Search</div>
          )}
          {query
            ? data.map((user) => {
                const { _id: id, username } = user;
                return (
                  <div
                    key={id}
                    className="flex justify-between items-center p-4 rounded-md text-gray-100 border-gray-600 border-[1px] bg-gray-900"
                  >
                    <div className="flex gap-2 h-full w-full items-center">
                      <div className="size-10">
                        <Avatar name={username} />
                      </div>
                      <span
                        title={username}
                        className="font-semibold text-ellipsis whitespace-nowrap overflow-hidden"
                      >
                        {username}
                      </span>
                    </div>
                    <div className="w-min">
                      <SimpleButton onClick={() => mutate({ id })}>
                        Send
                      </SimpleButton>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </Modal>
    </>
  );
}
