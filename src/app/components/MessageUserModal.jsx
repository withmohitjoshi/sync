import Avatar from "@/components/Avatar";
import SimpleButton from "@/components/Button/SimpleButton";
import SearchInput from "@/components/Input/SearchInput";
import Modal from "@/components/Layouts/Modal";
import CenterSinner from "@/components/Loaders/CenterSinner";
import { USERNAME_MAX_LENGTH } from "@/helpers/constants";
import { apiClient } from "@/lib/interceptor";
import { useQuery } from "@tanstack/react-query";
import { MessageCircle } from "lucide-react";
import React, { useState } from "react";

const MessageUserModal = () => {
  const [openConnectionsModal, setOpenConnectionsModal] = useState(false);
  const [search, setSearch] = useState("");
  const { isLoading, data = [] } = useQuery({
    queryKey: ["connections-list"],
    queryFn: () =>
      apiClient({
        method: "GET",
        url: `connections/connections-list`,
      }),
    select: (data) => data?.data?.data,
    enabled: Boolean(openConnectionsModal),
  });

  const toggleConnectionsModal = () => setOpenConnectionsModal((p) => !p);

  return (
    <>
      <button
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg flex items-center justify-center"
        onClick={toggleConnectionsModal}
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </button>
      <Modal
        isOpen={openConnectionsModal}
        onClose={() => {
          toggleConnectionsModal();
        }}
        title={"Connections"}
      >
        <SearchInput
          placeholder={"Search in you connections"}
          maxLength={USERNAME_MAX_LENGTH}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="min-h-[40vh] max-h-[40vh] mt-3 overflow-y-auto space-y-2">
          {isLoading && <CenterSinner />}
          {data.length === 0 && (
            <div className="text-gray-600 text-center">
              You have no connections
            </div>
          )}
          {data
            .filter((user) => {
              if (!search) {
                return user;
              } else {
                return user.username
                  .toLowerCase()
                  .includes(search.toLowerCase());
              }
            })
            .map((user) => {
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
                    <SimpleButton>Message</SimpleButton>
                  </div>
                </div>
              );
            })}
        </div>
      </Modal>
    </>
  );
};

export default MessageUserModal;
