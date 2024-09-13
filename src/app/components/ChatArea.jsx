import Avatar from "@/components/Avatar";
import TextInput from "@/components/Input/TextInput";
import { Send } from "lucide-react";
import React from "react";

const ChatArea = () => {
  return (
    <div className="flex flex-col w-full h-full border-l-[1px] border-gray-800">
      <Header />
      <Body />
      <MessageInput />
    </div>
  );
};

export default ChatArea;

function Header() {
  return (
    <div className="flex items-center p-2 gap-2 border-b border-gray-800 w-full">
      <span className="size-10">
        <Avatar />
      </span>
      <div>
        <h2 className="text-lg font-semibold text-gray-100">Username</h2>
        <p className="text-sm text-gray-400">Online</p>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <Message sender="them" content="Hey, how's it going?" time="10:30 AM" />
      <Message
        sender="me"
        content="Hello! I'm doing well. How about you?"
        time="10:35 AM"
      />
      <Message
        sender="them"
        content="I'm good too. Just working on some new designs."
        time="10:40 AM"
      />
    </div>
  );
}

function Message({ sender, content, time }) {
  return (
    <div
      className={`flex ${sender === "me" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xs mx-2 p-3 rounded-lg ${
          sender === "me"
            ? "bg-blue-600 text-white"
            : "bg-gray-800 text-gray-100"
        }`}
      >
        <p>{content}</p>
        <span className="block text-xs text-gray-400 mt-1">{time}</span>
      </div>
    </div>
  );
}

function MessageInput() {
  return (
    <div className="flex items-center w-full p-4 gap-2">
      <TextInput placeholder="Type your message..." />
      <span>
        <Send />
      </span>
    </div>
  );
}
