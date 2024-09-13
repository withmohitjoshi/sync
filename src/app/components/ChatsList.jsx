import Avatar from "@/components/Avatar";
import SearchInput from "@/components/Input/SearchInput";
import React from "react";

const ChatsList = () => {
  return (
    <div
      // className="flex-grow overflow-y-auto w-full max-w-sm p-2"
      className="w-full max-w-sm flex flex-col h-full"
    >
      <div className="p-2">
        <SearchInput placeholder="Search chat..." />
      </div>
      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-2 p-2">
          {Array(16)
            .fill(0)
            .map((_, i) => (
              <Tile key={i} />
            ))}
        </div>
      </div>
      {/* <div className="flex flex-col gap-2 mt-3 space-y-2 overflow-y-auto min-h-full">
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
      </div> */}
    </div>
  );
};

export default ChatsList;

const Tile = () => (
  <div className="flex justify-between items-center text-gray-100  bg-gray-900 hover:bg-gray-800 p-3 rounded cursor-pointer">
    <div className="flex gap-2 h-full w-full items-center">
      <div className="size-10">
        <Avatar name={"User"} />
      </div>
      <div className="flex flex-col">
        <span
          title={"username"}
          className="font-semibold text-ellipsis whitespace-nowrap overflow-hidden"
        >
          {"username"}
        </span>
        <span className="text-gray-600 text-xs">
          Last Message
          {/* {formatDateTime(createdAt)} */}
        </span>
      </div>
    </div>
    <div className="flex">
      <span className="text-gray-600 text-xs text-nowrap">03:12 PM</span>
    </div>
  </div>
);
